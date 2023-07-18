import { model, Schema } from 'mongoose'

export interface IEmployee {
  firstName: string,
  lastName: string,
  image?: string
}

const employeeSchema = new Schema<IEmployee>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String }
})

const EmployeeModel = model('Employee', employeeSchema)

export default EmployeeModel
