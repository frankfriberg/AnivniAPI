import { Schema, model, ObjectId, PopulatedDoc } from 'mongoose'
import { Guest } from './guest.model'

enum QuestionTypes {
  Text = 'text',
  Radio = 'radio',
  Checkbox = 'checkbox',
  Number = 'number',
  Date = 'date',
  Select = 'select',
  Boolean = 'boolean',
}

interface Questions {
  type: QuestionTypes
  label: {
    [language: string]: string
  }
  options?: Array<String>
}

interface Event {
  user: ObjectId
  slug: string
  name: string
  date: Date
  questions?: Array<Questions>
  guests?: Array<Guest>
}

const EventSchema = new Schema<Event>({
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
          values: Object.values(QuestionTypes),
          message: 'Type {VALUE} is not supported',
        },
      },
      label: {
        type: Map,
        of: String,
        required: [true, 'label is required'],
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

const EventModel = model<Event>('Event', EventSchema)

export default EventModel
export { Event, QuestionTypes }
