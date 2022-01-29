import { Document, ObjectId } from 'mongoose'

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

export interface Event extends Document {
  user: ObjectId
  slug: string
  title: string
  adress: string
  date: Date
  questions?: Array<Questions>
}
