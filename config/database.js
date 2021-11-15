import mongoose from 'mongoose'

import SeedDatabase from '../seeds'

export default function connect() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      if (process.env.NODE_ENV === 'development') {
        SeedDatabase()
        console.log('Database seeded')
      }
      console.log('MongoDB Connected...')
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
