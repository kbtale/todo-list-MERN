import Router from 'express'
import { requireAuth } from '../middlewares/validateToken.js'
import {
getTask,
getTasks,
createTask,
updateTask,
deleteTask
}
from '../controllers/tasks.controller.js'
import { getTaskSuggestion, manifestTask, deferTask } from '../controllers/oracle.controller.js'

const router = Router()

router.get('/tasks', requireAuth, getTasks)
router.get('/tasks/oracle', requireAuth, getTaskSuggestion)
router.post('/tasks/:id/manifest', requireAuth, manifestTask)
router.post('/tasks/:id/defer', requireAuth, deferTask)
router.get('/tasks:id', requireAuth, getTask)
router.post('/tasks', requireAuth, createTask)
router.delete('/tasks:id', requireAuth, deleteTask)
router.put('/tasks:id', requireAuth, updateTask)

export default router