import { Router } from 'express'
import { requireAuth } from '../middlewares/validateToken.js'
import {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/tasks.controller.js'
import { getTaskSuggestion, manifestTask, deferTask, getSyncStats, updateUserEnergy } from '../controllers/oracle.controller.js'

const router = Router()

// Oracle Specific Routes
router.get('/tasks/oracle', requireAuth, getTaskSuggestion)
router.get('/tasks/oracle/stats', requireAuth, getSyncStats)
router.post('/users/energy', requireAuth, updateUserEnergy)
router.post('/tasks/:id/manifest', requireAuth, manifestTask)
router.post('/tasks/:id/defer', requireAuth, deferTask)

// Standard CRUD Routes
router.get('/tasks', requireAuth, getTasks)
router.post('/tasks', requireAuth, createTask)
router.get('/tasks/:id', requireAuth, getTask)
router.put('/tasks/:id', requireAuth, updateTask)
router.delete('/tasks/:id', requireAuth, deleteTask)

export default router