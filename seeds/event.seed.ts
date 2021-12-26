import { ObjectId } from 'mongoose'
import { Event } from '../models'
import { QuestionTypes } from '../models/event.model'

export default function seedEvent(userId: ObjectId) {
  const event: Event = {
    user: userId,
    name: 'Test Event',
    slug: 'testevent',
    date: new Date('2018-01-01'),
    questions: [
      {
        type: QuestionTypes.Boolean,
        label: {
          nb: 'Trenger du sted å bo?',
          en: 'Need a place to stay?',
        },
      },
      {
        type: QuestionTypes.Boolean,
        label: {
          nb: 'Trenger du sted å fly?',
          en: 'Need a place to fly?',
        },
      },
    ],
  }

  return event
}
