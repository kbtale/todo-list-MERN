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
    const { title, description, date } = req.body

    const newTask = new Task({
        title,
        description,
        date,
        user: req.userId
    })
    const task = await newTask.save()
    res.json(task)
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