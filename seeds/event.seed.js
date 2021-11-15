export default function seedEvent(userId) {
  const event = {
    user: userId,
    name: 'Test Event',
    slug: 'testevent',
    date: '2018-01-01',
    questions: [
      {
        type: 'boolean',
        label: {
          nb: 'Trenger du sted å bo?',
          en: 'Need a place to stay?',
        },
      },
    ],
  }

  return event
}
