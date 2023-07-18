import { model, Schema } from 'mongoose'

export interface ITool {
  name: string,
  description: string
}

const toolSchema = new Schema<ITool>({
  name: { type: String, required: true },
  description: { type: String, required: true }
})

const ToolModel = model('Tool', toolSchema)

export default ToolModel
