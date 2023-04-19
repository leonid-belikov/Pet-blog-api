import { Router, Request, Response } from 'express'

export const articleRoute = Router()

articleRoute.get('/', (req: Request, res: Response) => {
    res.send({ msg: 'Yoyoyo2' })
})
