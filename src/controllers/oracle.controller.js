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

        // --- Scoring Algorithm ---
        const scoredTasks = tasks.map(task => {
            let score = PRIORITY_WEIGHTS[task.priority] || 0
            
            if (task.category === 'deep-work' && task.energyLevel >= 4) {
                score *= ENERGY_MODIFIER
            }

            score -= (task.rejectionCount * 5)

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
