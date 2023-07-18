import { model, Schema } from 'mongoose'

enum Status {
  TODO = 'To do',
  PROGRESS = 'Progress',
  DONE = 'Done'
}

export interface IStatus {
  name: Status
}

const statusSchema = new Schema<IStatus>({
  name: { type: String, required: true }
})

const StatusModel = model('Status', statusSchema)

export default StatusModel
