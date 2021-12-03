import mongoose from 'mongoose'
import { resetDatabase } from '../seeds'

export default function connect(): void {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
      if (process.env.NODE_ENV === 'development') {
        resetDatabase().then(() => console.log('Database seeded'))
      }
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
