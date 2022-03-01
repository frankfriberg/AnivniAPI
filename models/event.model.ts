import { Schema, model } from 'mongoose'
import { Event, QuestionTypes } from '../types/event.types'
import { TemplateOptions } from './template.model'

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
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  date: {
    type: Date,
    required: [true, 'date is required'],
  },
  adress: {
    type: String,
    requried: [true, 'adress is required'],
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
      options: [{ type: Map, of: String }],
    },
  ],
  template: {
    type: Schema.Types.ObjectId,
    ref: 'Template',
    required: true,
  },
  customTemplate: {
    ...TemplateOptions,
  },
})

const EventModel = model<Event>('Event', EventSchema)

export default EventModel
