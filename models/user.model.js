import mongoose from 'mongoose'
const { Schema } = mongoose

// TODO: [AN-16] Add duplicate validation for slug and email + other fields
const UserSchema = new Schema({
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
  admin: {
    type: Boolean,
    default: false,
  },
  organizer: {
    type: Boolean,
    default: false,
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

const User = mongoose.model('User', UserSchema)

export default User
