import { Router, Request, Response } from 'express'
import Task from '../models/Task'

export const tasksRoute = Router()

tasksRoute.get('/', async (req: Request, res: Response) => {
  const query = await Task.find()
  res.json(query)
})

tasksRoute.post('/', (req: Request, res: Response) => {
  const { title, executor, description } = req.body
  // Write to DB
  res.sendStatus(200)
})

tasksRoute.put('/:id(\\d+)', (req: Request, res: Response) => {
  const id = req.params.id
  const text = req.body.text
  res.send({ msg: `Yoyoyo2 put, id: ${id}, text: ${text}` })
})

tasksRoute.delete('/:id(\\d+)', (req: Request, res: Response) => {
  const id = req.params.id
  res.send({ msg: `Yoyoyo2 delete, id: ${id}` })
})
