import { Request } from 'express'

export function getUpdatedFields <T>(body: Request['body'], checkList: Array<keyof T>): Partial<T> {
  const result = {} as Partial<T>

  checkList.forEach(field => {
    if (field in body) result[field] = body[field]
  })

  return result
}
