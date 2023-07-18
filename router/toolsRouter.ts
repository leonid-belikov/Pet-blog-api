import { NextFunction, Request, Response, Router } from 'express'
import Tool, { ITool } from '../models/Tool'
import { getUpdatedFields } from '../helpers'

export const toolsRouter = Router()

toolsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // Получение списка инструментов (постранично, если передан параметр page)

  try {
    const page = req.query.page ? Number(req.query.page) : undefined

    //TODO: Add parameters for filtering by: name
    const filterObject = {}

    if (page) {
      const limit = 10

      const dataPromise = Tool.find(filterObject, null, { skip: (page - 1) * limit, limit })
      const totalPromise = Tool.find(filterObject).estimatedDocumentCount()

      const result: Array<PromiseSettledResult<unknown>> = await Promise.allSettled([
        dataPromise,
        totalPromise
      ])

      let data: Array<ITool> = [], total: number = 0

      if (result[0].status === 'fulfilled') {
        const obj = result[0] as PromiseFulfilledResult<Array<ITool>>
        data = obj.value
      }

      if (result[1].status === 'fulfilled') {
        const obj = result[1] as PromiseFulfilledResult<number>
        total = obj.value
      }

      res.json({ data, meta: { total } })
      return
    }

    const query = await Tool.find(filterObject)
    res.json(query)
  } catch (err) {
    next(err)
  }
})

toolsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Получение конкретного инструмента

  try {
    const id = req.params.id
    const query = await Tool.findById(id)
    res.json(query)
  } catch (err) {
    next(err)
  }
})

toolsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  // Создание нового инструмента

  try {
    const { name, description } = req.body
    const tool = new Tool({ name, description })
    await tool.save()
    res.json(tool)
  } catch (err) {
    next(err)
  }
})

toolsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Редактирование инструмента

  try {
    const id = req.params.id
    const updatedFields = getUpdatedFields<ITool>(req.body, ['name', 'description'])
    const updatedTool = await Tool.findByIdAndUpdate(id, { $set: updatedFields }, { returnDocument: 'after' })
    res.json(updatedTool)
  } catch (err) {
    next(err)
  }
})

toolsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Удаление инструмента

  try {
    const id = req.params.id
    const deletedTool = await Tool.findByIdAndDelete(id)
    res.json(deletedTool)
  } catch (err) {
    next(err)
  }
})
