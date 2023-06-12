import { Schema, model, Document } from 'mongoose'

interface ITask extends Document {
  name: string
}

const taskSchema = new Schema<ITask>({
  name: { type: String, required: true }
})

const TaskModel = model('Task', taskSchema)
export default TaskModel
