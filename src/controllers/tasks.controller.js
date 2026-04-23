import Task from "../models/task.model.js"

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({message: "Task not found"})
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
    const task = await Task.findByIdAndUpdate(req.body)
    if (!task) return res.status(404).json({message: "Task not found"})
    res.json(req.body)
}
export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({message: "Task not found"})
    res.sendStatus(204)
}