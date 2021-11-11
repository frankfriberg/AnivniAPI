import { Router } from 'express'

import {
  createNew,
  findAll,
  findBySlug,
  updateBySlug,
  deleteBySlug,
} from '../controllers/client.controller'

const ClientRouter = Router()

// Create
ClientRouter.post('/', (req, res, next) => {
  createNew(req.body)
    .then((created) => res.status(201).json(created))
    .catch((err) => next(err))
})

// Read
ClientRouter.get('/', (req, res, next) => {
  findAll().then((clients) => res.status(200).json(clients))
})

ClientRouter.get('/:slug', (req, res, next) => {
  findBySlug(req.params.slug)
    .then((client) => res.status(200).(client))
    .catch((err) => next(err))
})

// Update
ClientRouter.put('/:slug', (req, res, next) => {
  updateBySlug(req.params.slug, req.body)
    .then((client) => res.status(200).json(client))
    .catch((err) => next(err))
})

// Delete
ClientRouter.delete('/:slug', (req, res, next) => {
  deleteBySlug(req.params.slug)
    .then((message) => res.status(200).json(message))
    .catch((err) => next(err))
})

export default ClientRouter
