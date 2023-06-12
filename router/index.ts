import { Router } from 'express'
import { tasksRoute } from './tasksRoute'

export const router = Router()

router.use('/tasks', tasksRoute)
