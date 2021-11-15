import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'

import ErrorHandler from './middleware/errors'
import connect from './config/database'

import routes from './routes'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v3', routes)

app.use(ErrorHandler)

connect()

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
