import express from 'express'
import mongoose from 'mongoose'
// import cors from 'cors'
import morgan from 'morgan'

import ErrorHandler from './middleware/errors'

import routes from './routes'
import DatabaseSeed from './seeds'

const app = express()
const port = process.env.PORT || 8000

// app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v3', routes)

app.use(ErrorHandler)

const dbPath = 'mongodb://127.0.0.1:27017/aninvi'
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(dbPath, options, async (err, res) => {
  if (err) {
    throw err
  } else {
    DatabaseSeed()
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  }
})
