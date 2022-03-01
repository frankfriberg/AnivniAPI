import HttpException from '../helpers/error'

import TemplateModel from '../models/template.model'
import { Template } from '../types/template.type'

// Create
export async function addNew(data: Template): Promise<Template> {
  return TemplateModel.create(data)
}

// Read
export async function getOne(id: string): Promise<Template> {
  return TemplateModel.findById(id)
    .exec()
    .then((template) => {
      if (!template) throw new HttpException(404, 'Template not found')
      return template
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

export async function getAll(): Promise<Template[]> {
  return TemplateModel.find({})
    .exec()
    .then((templates) => templates)
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

// Update
export async function updateOne(id: string, data: any): Promise<Template> {
  return TemplateModel.findByIdAndUpdate(id, data, {
    new: true,
    useFindAndModify: false,
  })
    .exec()
    .then((template) => {
      if (!template) throw new HttpException(404, 'Template not found')
      return template
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

// Delete
export async function deleteOne(id: string): Promise<Template> {
  return TemplateModel.findByIdAndDelete(id)
    .exec()
    .then((template) => {
      if (!template) throw new HttpException(404, 'Template not found')
      return template
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}
