import { Router, Request, Response } from 'express'

export const tasksRoute = Router()

tasksRoute.get('/', (req: Request, res: Response) => {
    res.send({ msg: 'Yoyoyo2' })
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
