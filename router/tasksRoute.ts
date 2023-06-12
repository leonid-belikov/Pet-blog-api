import { Router, Request, Response } from 'express'
import Task from '../models/Task'

export const tasksRoute = Router()

tasksRoute.get('/', async (req: Request, res: Response) => {
    const query = await Task.find()
    console.log(query)
    res.send({ query })
/*
    if (!data || data.length === 0) {
        res.send({})
    } else {
        res.send(data);
    }
*/
})

tasksRoute.post('/:id(\\d+)', (req: Request, res: Response) => {
    const id = req.params.id
    const text = req.body.text
    res.send({ msg: `Yoyoyo2 post, id: ${id}, text: ${text}` })
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
