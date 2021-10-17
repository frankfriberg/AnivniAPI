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
    .then((created) => res.success(201, created))
    .catch((err) => next(err))
})

// Read
ClientRouter.get('/', (req, res, next) => {
  findAll().then((clients) => res.success(200, clients))
})

ClientRouter.get('/:slug', (req, res, next) => {
  findBySlug(req.params.slug)
    .then((client) => res.success(200, client))
    .catch((err) => next(err))
})

// Update
ClientRouter.put('/:slug', (req, res, next) => {
  updateBySlug(req.params.slug, req.body)
    .then((client) => res.success(200, client))
    .catch((err) => next(err))
})

// Delete
ClientRouter.delete('/:slug', (req, res, next) => {
  deleteBySlug(req.params.slug)
    .then((message) => res.success(200, message))
    .catch((err) => next(err))
})

export default ClientRouter
