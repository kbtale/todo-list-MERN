import {Router} from 'express'
import {register, login, logout, profile} from '../controllers/auth.controller.js'
import {requireAuth} from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validateData.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/profile', requireAuth, profile)

export default router;