import mongoose from 'mongoose'
const { Schema } = mongoose

// TODO: [AN-16] Add duplicate validation for slug and email + other fields
const ClientSchema = new Schema({
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'slug is required'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    unique: true,
    match: /.+\@.+\..+/,
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  date: {
    type: Date,
    required: [true, 'date is required'],
  },
  questions: [
    {
      type: {
        type: String,
        required: [true, 'type is required'],
        enum: {
          values: [
            'text',
            'radio',
            'checkbox',
            'number',
            'date',
            'select',
            'boolean',
          ],
          message: 'Type {VALUE} is not supported',
        },
      },
      label: {
        type: Map,
        of: String,
      },
      options: [String],
    },
  ],
  guests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Guest',
    },
  ],
})

const Client = mongoose.model('Client', ClientSchema)

export default Client
