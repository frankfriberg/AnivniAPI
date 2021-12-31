import { Schema, model } from 'mongoose'
import { Guest } from '../types/guest.types'

const GuestSchema = new Schema<Guest>(
  {
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
    },
    otherAllergy: [String],
    answers: {
      type: Object,
    },
  },
  {
    minimize: false,
  }
)

const GuestModel = model<Guest>('Guest', GuestSchema)

export default GuestModel
