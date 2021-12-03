import { Router } from 'express'
import { auth, isAdmin } from '../middleware/auth'

import {
  addNew,
  listAllBySlug,
  listAll,
  updateById,
  deleteById,
} from '../controllers/guest.controller'

const GuestRouter = Router()

// Create
GuestRouter.post('/', (req, res, next) => {
  addNew(req.body)
    .then((added) => res.status(201).json(added))
    .catch((err) => next(err))
})

// Read
GuestRouter.get('/', auth, isAdmin, (req, res, next) => {
  listAll()
    .then((guests) => res.status(200).json(guests))
    .catch((err) => next(err))
})

GuestRouter.get('/:slug', auth, (req, res, next) => {
  listAllBySlug(req.params.slug, req.user)
    .then((guests) => res.status(200).json(guests))
    .catch((err) => next(err))
})

// Update
GuestRouter.put('/:id', (req, res, next) => {
  updateById(req.params.id, req.body)
    .then((guest) => res.status(200).json(guest))
    .catch((err) => next(err))
})

// Delete
GuestRouter.delete('/:id', auth, (req, res, next) => {
  deleteById(req.params.id)
    .then((deleted) => res.status(200).json(deleted))
    .catch((err) => next(err))
})

export default GuestRouter
