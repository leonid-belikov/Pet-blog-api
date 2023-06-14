import { Schema, model, Document } from 'mongoose'
import { IUser } from './User'

interface ITask extends Document {
  title: string
  executor: IUser
  description: string
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  executor: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  description: { type: String, required: true }
})

const TaskModel = model('Task', taskSchema)
export default TaskModel
