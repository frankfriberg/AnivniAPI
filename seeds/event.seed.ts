import { ObjectId } from 'mongoose'
import { QuestionTypes } from '../types/event.types'

export default function seedEvent(userId: ObjectId) {
  const event = {
    user: userId,
    title: 'Test Event',
    slug: 'testevent',
    date: new Date('2018-01-01'),
    adress: 'Test Address',
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
      {
        type: QuestionTypes.Checkbox,
        label: {
          nb: 'Hvilke kategorier vil du ha?',
          en: 'Which categories do you want?',
        },
        options: [
          {
            nb: 'Kultur',
            en: 'Culture',
          },
          {
            nb: 'Natur',
            en: 'Nature',
          },
        ],
      },
    ],
  }

  return event
}
