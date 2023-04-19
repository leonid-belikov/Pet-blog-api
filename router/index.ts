import { Router } from 'express'
import { articleRoute } from './articleRoute'

export const router = Router()

router.use('/article', articleRoute)
