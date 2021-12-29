import { Document } from 'mongoose'
import { Event } from './event.types'

export enum RoleTypes {
  User = 'user',
  Organizer = 'organizer',
  Admin = 'admin',
}

export interface User extends Document {
  email: string
  password: string
  role: RoleTypes
  token?: string
  refresh?: string
  events?: Array<Event>
}

export interface UserToken {
  id: string
  email: string
  role: string
}
