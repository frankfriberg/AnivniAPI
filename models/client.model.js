import mongoose from 'mongoose'
const { Schema } = mongoose

const ClientSchema = new Schema({
  slug: {
    type: String,
    lowecasea: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  questions: [
    {
      type: { type: String, required: true },
      label: {
        type: Map,
        of: String,
      },
      options: [String],
    },
  ],
  guests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Guest',
    },
  ],
})

const Client = mongoose.model('Client', ClientSchema)

export default Client
