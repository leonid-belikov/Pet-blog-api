import { Router, Request, Response } from 'express'

export const articleRoute = Router()

articleRoute.get('/', (req: Request, res: Response) => {
    res.send({ msg: 'Yoyoyo2' })
})

articleRoute.post('/', (req: Request, res: Response) => {
    const text = req.body.text
    res.send({ msg: `Yoyoyo2 post, text: ${text}` })
})
