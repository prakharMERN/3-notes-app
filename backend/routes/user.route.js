import express from 'express'
import { bodyValidation } from '../validators/validation.js'
import { registerSchema } from '../validators/register.schema.js'
import { loginSchema } from '../validators/login.schema.js'
import { login, me, register } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/register', bodyValidation(registerSchema), register)
router.post('/login', bodyValidation(loginSchema), login)
router.get('/me', me)

export default router