export default function seedGuests(id) {
  const names = [
    'Colin Knowles',
    'Carolina Chadwick',
    'Aqsa Head',
    'Jeffery Armstrong',
    'Humphrey Burch',
    'Blythe Wise',
    'Dwayne Conner',
    'Kiera Hale',
    'Finnian Whelan',
    'Henna Lang',
  ]

  const guests = []

  for (const guest of names) {
    guests.push({
      client: id,
      name: guest,
      attending: Math.random() < 0.7,
    })
  }

  return guests
}
