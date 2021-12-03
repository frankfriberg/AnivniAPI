import { Schema, model, Document } from 'mongoose'
import { Event } from './event.model'

enum RoleTypes {
  User = 'user',
  Organizer = 'organizer',
  Admin = 'admin',
}

interface User extends Document {
  email: string
  password: string
  role: RoleTypes
  token: string
  refresh: string
  event: Event
}

// TODO: [AN-16] Add duplicate validation for slug and email + other fields
const UserSchema = new Schema<User>({
  email: {
    type: String,
    unique: true,
    match: /.+\@.+\..+/,
    lowercase: true,
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  role: {
    type: String,
    enum: Object.values(RoleTypes),
    default: RoleTypes.User,
  },
  token: {
    type: String,
  },
  refresh: {
    type: String,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
})

const UserModel = model<User>('User', UserSchema)

export default UserModel
export { User }
