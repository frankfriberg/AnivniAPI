import { Document, ObjectId } from 'mongoose'

export interface Allergy {
  lactose: boolean
  gluten: boolean
  fish: boolean
  nuts: boolean
}

export interface Guest extends Document {
  event: ObjectId
  name: string
  attending: boolean
  allergies: Allergies
  otherAllergy: Array<string>
  answers: Object
}
