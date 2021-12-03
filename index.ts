import express, { Application } from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import morgan from 'morgan'

import ErrorHandler from './middleware/error.middleware'
import connect from './config/database'

import routes from './routes'

dotenv.config()
const app: Application = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/v3', routes)

app.use(ErrorHandler)

connect()

if (process.env.NODE_ENV === 'development') {
  app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}
