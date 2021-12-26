import { Schema, model, ObjectId } from 'mongoose'

interface Allergies {
  lactose: boolean
  gluten: boolean
  fish: boolean
  nuts: boolean
  other: Array<string>
}

interface Guest {
  event: ObjectId
  name: string
  attending: boolean
  allergies?: Allergies
  questions?: Object
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
  allergies: {
    lactose: Boolean,
    gluten: Boolean,
    fish: Boolean,
    nuts: Boolean,
    other: [String],
  },
  questions: {
    type: Object,
  },
})

const GuestModel = model<Guest>('Guest', GuestSchema)

export default GuestModel
export { Guest }
