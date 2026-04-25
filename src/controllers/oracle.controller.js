import Task from "../models/task.model.js"

const PRIORITY_WEIGHTS = {
    urgent: 50,
    high: 30,
    medium: 15,
    low: 5
}

const ENERGY_MODIFIER = 1.2
const STALE_THRESHOLD_DAYS = 3

export const getTaskSuggestion = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.userId,
            isCompleted: false
        })

        if (!tasks || tasks.length === 0) {
            return res.json({ message: "The Oracle finds no pending tasks. You are at peace.", task: null })
        }

        const lastCompleted = await Task.findOne({ user: req.userId, isCompleted: true }).sort({ completedAt: -1 })
        const lastCategory = lastCompleted ? lastCompleted.category : null

        // scoring algorithm
        const scoredTasks = tasks.map(task => {
            let score = PRIORITY_WEIGHTS[task.priority] || 0
            
            if (task.category === 'deep-work' && task.energyLevel >= 4) {
                score *= ENERGY_MODIFIER
            }

            // urgency modifier
            if (task.date && new Date(task.date) <= new Date()) {
                score *= 1.5
            }

            score -= (task.rejectionCount * 5)

            // variety modifier
            if (lastCategory && task.category !== lastCategory) {
                score *= 1.2
            } else if (lastCategory && task.category === lastCategory) {
                score *= 0.8
            }

            return { task, score }
        })

        const chosen = scoredTasks.sort((a, b) => b.score - a.score)[0]

        // generate rationale
        let whisper = "The Oracle has chosen this path for you."

        if (chosen.task.category === lastCategory) {
            whisper = "Continuing the thread. One more push in this category?"
        } else if (lastCategory) {
            whisper = `Transitioning from ${lastCategory} to ${chosen.task.category}. This balances your focus.`
        }

        if (chosen.task.priority === 'urgent') whisper = "This is a pivotal moment: priority demands action."
        if (chosen.task.rejectionCount > 2) whisper = "The path you avoid is the path you need. Manifest this now."
        
        if (chosen.task.date && new Date(chosen.task.date) <= new Date()) {
            whisper = "Time flows onward. This task is rooted in the present moment."
        }

        res.json({
            task: chosen.task,
            score: chosen.score,
            whisper
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const manifestTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { isCompleted: true, completedAt: new Date() },
            { new: true }
        )
        if (!task) return res.status(404).json({ message: "Task not found" })
        res.json({ message: "Task manifested successfully", task })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deferTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { 
                $inc: { rejectionCount: 1 },
                lastSuggested: new Date() 
            },
            { new: true }
        )
        if (!task) return res.status(404).json({ message: "Task not found" })
        res.json({ message: "Task deferred for later exploration", task })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getSyncStats = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId })
        
        const manifested = tasks.filter(t => t.isCompleted).length
        const totalRejections = tasks.reduce((sum, t) => sum + (t.rejectionCount || 0), 0)
        
        const totalSuggestions = manifested + totalRejections
        const syncRate = totalSuggestions > 0 ? (manifested / totalSuggestions) * 100 : 0

        // Heatmap logic
        const completedTasks = tasks.filter(t => t.isCompleted && t.completedAt)
        const heatmap = {
            morning: { total: 0, energy: 0 },
            afternoon: { total: 0, energy: 0 },
            evening: { total: 0, energy: 0 },
            night: { total: 0, energy: 0 }
        }

        completedTasks.forEach(t => {
            const hour = new Date(t.completedAt).getHours()
            let block = 'night'
            if (hour >= 5 && hour < 12) block = 'morning'
            else if (hour >= 12 && hour < 18) block = 'afternoon'
            else if (hour >= 18 && hour < 23) block = 'evening'

            heatmap[block].total += 1
            heatmap[block].energy += t.energyLevel || 0
        })

        const heatmapData = Object.keys(heatmap).map(block => ({
            block,
            avgEnergy: heatmap[block].total > 0 ? (heatmap[block].energy / heatmap[block].total).toFixed(1) : 0,
            count: heatmap[block].total
        }))

        res.json({
            manifested,
            totalRejections,
            totalSuggestions,
            syncRate: Math.round(syncRate),
            heatmap: heatmapData
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
