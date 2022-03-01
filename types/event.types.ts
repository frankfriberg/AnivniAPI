import { Document, ObjectId } from 'mongoose'
import {
  TemplateBaseOptions,
  TemplateInviteOptions,
  TemplateInfoOptions,
  TemplateResponseOptions,
  TemplateFinishOptions,
} from '../types/template.type'

export enum QuestionTypes {
  Text = 'text',
  Radio = 'radio',
  Checkbox = 'checkbox',
  Number = 'number',
  Date = 'date',
  Select = 'select',
  Boolean = 'boolean',
}

export interface Questions {
  type: string
  label: {
    [language: string]: string
  }
  options?: [{ [language: string]: string }]
}

interface CustomTemplate {
  baseOptions: TemplateBaseOptions
  inviteOptions: TemplateInviteOptions
  infoOptions: TemplateInfoOptions
  responseOptions: TemplateResponseOptions
  finishOptions: TemplateFinishOptions
}

export interface Event extends Document {
  user: ObjectId
  slug: string
  title: string
  adress: string
  date: Date
  questions?: Array<Questions>
  template: ObjectId
  customTemplate?: CustomTemplate
}
