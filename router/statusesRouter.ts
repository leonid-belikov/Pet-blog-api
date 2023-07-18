import { Router, Request, Response, NextFunction } from 'express'
import Status from '../models/Status'

export const statusesRouter = Router()

statusesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // Получение списка статусов

  try {
    const query = await Status.find()
    res.json(query)
  } catch (err) {
    next(err)
  }
})
