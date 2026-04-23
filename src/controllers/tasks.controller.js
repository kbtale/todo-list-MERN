import Task from "../models/task.model.js"

export const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.userId })
        if (!task) return res.status(404).json({ message: "Task not found" })
        res.json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.userId
    })
    res.json(tasks)
}
export const createTask = async (req, res) => {
    try {
        const { title, description, date, priority, energyLevel, category } = req.body

        const newTask = new Task({
            title,
            description,
            date,
            priority,
            energyLevel,
            category,
            user: req.userId
        })
        const task = await newTask.save()
        res.json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            { new: true }
        )
        if (!task) return res.status(404).json({ message: "Task not found" })
        res.json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId })
        if (!task) return res.status(404).json({ message: "Task not found" })
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}