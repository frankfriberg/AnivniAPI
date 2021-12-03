import { Router } from 'express'
import { auth } from '../middleware/auth'
import { getEvent, addNew } from '../controllers/event.controller'

const EventRouter = Router()

EventRouter.get('/:slug', (req, res, next) => {
  getEvent(req.params.slug)
    .then((event) => res.status(200).json(event))
    .catch((err) => next(err))
})

EventRouter.post('/', (req, res, next) => {
  addNew(req.body)
    .then((createdEvent) => res.status(201).json(createdEvent))
    .catch((err) => next(err))
})

export default EventRouter
