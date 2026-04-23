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

        let whisper = "The Oracle has chosen this path for you."
        if (chosen.task.priority === 'urgent') whisper = "This demands your immediate presence."
        if (chosen.task.rejectionCount > 2) whisper = "Do not hide from this task any longer."
        if (chosen.task.category === 'deep-work') whisper = "Your mind is sharp: manifest this challenge."

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
