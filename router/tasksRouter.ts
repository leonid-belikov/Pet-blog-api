import { NextFunction, Request, Response, Router } from 'express'
import Task, { ITask } from '../models/Task'
import { getUpdatedFields } from '../helpers'

export const tasksRouter = Router()

tasksRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // Получение списка задач (постранично)

  try {
    const limit = 10
    const page = Number(req.query.page) ?? 1

    //TODO: Add parameters for filtering by: title, executor, status
    const filterObject = {}

    const dataPromise = Task.find(filterObject, null, { skip: (page - 1) * limit, limit })
      .populate('executor')
      .populate('status')

    const totalPromise = Task.find(filterObject).estimatedDocumentCount()

    const result: Array<PromiseSettledResult<unknown>> = await Promise.allSettled([
      dataPromise,
      totalPromise
    ])
    let data: Array<ITask> = [], total: number = 0

    if (result[0].status === 'fulfilled') {
      const obj = result[0] as PromiseFulfilledResult<Array<ITask>>
      data = obj.value
    }

    if (result[1].status === 'fulfilled') {
      const obj = result[1] as PromiseFulfilledResult<number>
      total = obj.value
    }

    res.json({ data, meta: { total } })
  } catch (err) {
    next(err)
  }
})

tasksRouter.get('/employee/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Получение списка задач, связанных с конкретным сотрудником

  try {
    const executor = req.params.id
    const query = await Task.find({ executor })
      .populate('status')

    res.json(query)
  } catch (err) {
    next(err)
  }
})

tasksRouter.get('/tool/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Получение списка задач, связанных с конкретным инструментом

  try {
    const tool = req.params.id
    const query = await Task.find({ tools: { $elemMatch: { $eq: tool } } })
      .populate('status')

    res.json(query)
  } catch (err) {
    next(err)
  }
})

tasksRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Получение конкретной задачи

  try {
    const id = req.params.id
    const query = await Task.findById(id)
      .populate('executor')
      .populate('status')
      .populate('tools')

    res.json(query)
  } catch (err) {
    next(err)
  }
})

tasksRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  // Создание новой задачи

  try {
    const { title, description, executor, status, tools } = req.body
    const task = new Task({
      title,
      description,
      executor,
      status,
      tools
    })
    await task.save()
    res.json(task)
  } catch (err) {
    next(err)
  }
})

tasksRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Редактирование задачи

  try {
    const id = req.params.id
    const updatedFields = getUpdatedFields<ITask>(req.body, [
      'title',
      'description',
      'executor',
      'status',
      'tools'
    ])
    const updatedEmployee = await Task.findByIdAndUpdate(id, { $set: updatedFields }, { returnDocument: 'after' })
    res.json(updatedEmployee)
  } catch (err) {
    next(err)
  }
})

tasksRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Удаление задачи

  try {
    const id = req.params.id
    const deletedTask = await Task.findByIdAndDelete(id)
    res.json(deletedTask)
  } catch (err) {
    next(err)
  }
})
