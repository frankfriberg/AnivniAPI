import { Document, ObjectId } from 'mongoose'

export interface Allergies extends Object {
  lactose: boolean
  gluten: boolean
  fish: boolean
  nuts: boolean
}

export interface Guest extends Document {
  event: ObjectId
  name: string
  attending: boolean
  allergies?: Allergies
  otherAllergy?: Array<string>
  questions?: Object
}
