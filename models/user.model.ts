import { Schema, model } from 'mongoose'
import { User, RoleTypes } from '../types/user.types'

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
    select: false,
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
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
})

const UserModel = model<User>('User', UserSchema)

export default UserModel
