import mongoose from 'mongoose'
const { Schema } = mongoose

const GuestSchema = new Schema({
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

const Guest = mongoose.model('Guest', GuestSchema)

export default Guest
