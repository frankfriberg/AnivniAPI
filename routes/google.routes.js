import { Router } from 'express'

import { add } from '../controllers/google.controller'

const GoogleRouter = Router()

// Create
GoogleRouter.post('/', (req, res, next) => {
  add(req.body.spreadsheetId, req.body.table, req.body.data)
    .then((response) => {
      res
        .status(response.status)
        .json(
          `Added data to '${response.data.spreadsheetId}!${response.data.tableRange}'`
        )
    })
    .catch((err) => next(err))
})

// Read

// Update

// Delete

export default GoogleRouter
