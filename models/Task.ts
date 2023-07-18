import { Document, model, Schema } from 'mongoose'

export interface ITask extends Document {
  title: string
  description: string
  executor: Schema.Types.ObjectId
  status: Schema.Types.ObjectId
  tools?: Array<Schema.Types.ObjectId>
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  executor: { type: Schema.Types.ObjectId, required: true, ref: 'Employee' },
  status: { type: Schema.Types.ObjectId, required: true, ref: 'Status' },
  tools: [{ type: Schema.Types.ObjectId, ref: 'Tool' }]
})

const TaskModel = model('Task', taskSchema)

export default TaskModel
