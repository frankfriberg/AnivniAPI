import { Router } from 'express'
import {
  addNew,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} from '../controllers/template.controller'
import { auth, isAdmin } from '../middleware/auth'

const TemplateRouter = Router()

// Create
TemplateRouter.post('/', auth, isAdmin, (req, res, next) => {
  addNew(req.body)
    .then((createdTemplate) => res.status(201).json(createdTemplate))
    .catch((err) => next(err))
})

// Read
TemplateRouter.get('/', (req, res, next) => {
  getAll()
    .then((templates) => res.status(200).json(templates))
    .catch((err) => next(err))
})

TemplateRouter.get('/:id', (req, res, next) => {
  getOne(req.params.id)
    .then((template) => res.status(200).json(template))
    .catch((err) => next(err))
})

// Update
TemplateRouter.put('/:id', auth, isAdmin, (req, res, next) => {
  updateOne(req.params.id, req.body)
    .then((updatedTemplate) => res.status(200).json(updatedTemplate))
    .catch((err) => next(err))
})

// Delete
TemplateRouter.delete('/:id', auth, isAdmin, (req, res, next) => {
  deleteOne(req.params.id)
    .then((deletedTemplate) => res.status(200).json(deletedTemplate))
    .catch((err) => next(err))
})

export default TemplateRouter
