import { Router } from 'express'

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
    .then((added) => res.success(201, added))
    .catch((err) => next(err))
})

// Read
GuestRouter.get('/', (req, res, next) => {
  listAll()
    .then((guests) => res.success(200, guests))
    .catch((err) => next(err))
})
GuestRouter.get('/:slug', (req, res, next) => {
  listAllBySlug(req.params.slug)
    .then((guests) => res.success(200, guests))
    .catch((err) => next(err))
})

// Update
GuestRouter.put('/:id', (req, res, next) => {
  updateById(req.params.id, req.body)
    .then((guest) => res.success(200, guest))
    .catch((err) => next(err))
})

// Delete
GuestRouter.delete('/:id', (req, res, next) => {
  deleteById(req.params.id)
    .then((deleted) => res.success(200, deleted))
    .catch((err) => next(err))
})

export default GuestRouter
