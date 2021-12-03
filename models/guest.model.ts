import { Schema, model, ObjectId } from 'mongoose'

interface Guest {
  event: ObjectId
  name: string
  attending: boolean
  allergies?: Array<string>
  other?: Array<string>
}

const GuestSchema = new Schema<Guest>({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  attending: Boolean,
  allergies: [String],
  other: [String],
})

const GuestModel = model<Guest>('Guest', GuestSchema)

export default GuestModel
export { Guest }
