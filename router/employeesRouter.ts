import { NextFunction, Request, Response, Router } from 'express'
import Employee, { IEmployee } from '../models/Employee'
import { getUpdatedFields } from '../helpers'

export const employeesRouter = Router()

employeesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // Получение списка сотрудников (постранично, если передан параметр page)

  try {
    const page = req.query.page ? Number(req.query.page) : undefined

    //TODO: Add parameters for filtering by: firstName+lastName
    const filterObject = {}

    if (page) {
      const limit = 10

      const dataPromise = Employee.find(filterObject, null, { skip: (page - 1) * limit, limit })
      const totalPromise = Employee.find(filterObject).estimatedDocumentCount()

      const result: Array<PromiseSettledResult<unknown>> = await Promise.allSettled([
        dataPromise,
        totalPromise
      ])

      let data: Array<IEmployee> = [], total: number = 0

      if (result[0].status === 'fulfilled') {
        const obj = result[0] as PromiseFulfilledResult<Array<IEmployee>>
        data = obj.value
      }

      if (result[1].status === 'fulfilled') {
        const obj = result[1] as PromiseFulfilledResult<number>
        total = obj.value
      }

      res.json({ data, meta: { total } })
      return
    }

    const query = await Employee.find(filterObject)
    res.json(query)
  } catch (err) {
    next(err)
  }
})

employeesRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Получение конкретного сотрудника

  try {
    const id = req.params.id
    const query = await Employee.findById(id)
    res.json(query)
  } catch (err) {
    next(err)
  }
})

employeesRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  // Создание нового сотрудника

  try {
    const { firstName, lastName, image } = req.body
    const employee = new Employee({ firstName, lastName, image })
    await employee.save()
    res.json(employee)
  } catch (err) {
    next(err)
  }
})

employeesRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Редактирование сотрудника

  try {
    const id = req.params.id
    const updatedFields = getUpdatedFields<IEmployee>(req.body, ['firstName', 'lastName', 'image'])
    const updatedEmployee = await Employee.findByIdAndUpdate(id, { $set: updatedFields }, { returnDocument: 'after' })
    res.json(updatedEmployee)
  } catch (err) {
    next(err)
  }
})

employeesRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Удаление сотрудника

  try {
    const id = req.params.id
    const deletedEmployee = await Employee.findByIdAndDelete(id)
    res.json(deletedEmployee)
  } catch (err) {
    next(err)
  }
})
