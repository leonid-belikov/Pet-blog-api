import { Router } from 'express'
import { tasksRouter } from './tasksRouter'
import { employeesRouter } from './employeesRouter'
import { toolsRouter } from './toolsRouter'
import { statusesRouter } from './statusesRouter'

export const router = Router()

router.use('/tasks', tasksRouter)
router.use('/employees', employeesRouter)
router.use('/tools', toolsRouter)
router.use('/statuses', statusesRouter)
