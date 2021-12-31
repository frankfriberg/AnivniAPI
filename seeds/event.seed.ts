import { ObjectId } from 'mongoose'
import { QuestionTypes } from '../types/event.types'

export default function seedEvent(userId: ObjectId) {
  const event = {
    user: userId,
    title: 'Test Event',
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
