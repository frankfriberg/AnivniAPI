import mongoose from 'mongoose'
const { Schema } = mongoose

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'slug is required'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  date: {
    type: Date,
    required: [true, 'date is required'],
  },
  questions: [
    {
      type: {
        type: String,
        required: [true, 'type is required'],
        enum: {
          values: [
            'text',
            'radio',
            'checkbox',
            'number',
            'date',
            'select',
            'boolean',
          ],
          message: 'Type {VALUE} is not supported',
        },
      },
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

const Event = mongoose.model('Event', EventSchema)

export default Event
