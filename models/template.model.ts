import { Schema, model } from 'mongoose'
import { Template } from '../types/template.type'

export const TemplateOptions = {
  baseOptions: {
    primaryColor: String,
    secondaryColor: String,
    backgroundColor: String,
    fontColor: String,
    fontFamily: String,
    buttonStyle: String,
  },
  inviteOptions: {
    title: {
      fontFamily: String,
      fontSize: String,
      fontColor: String,
      fontWeight: String,
      textAlign: String,
    },
    subtitle: {
      beforeTitle: Boolean,
      fontFamily: String,
      fontSize: String,
      fontColor: String,
      fontWeight: String,
      textAlign: String,
    },
    date: {
      style: String,
      fontFamily: String,
      size: String,
    },
    topImage: String,
    bottomImage: String,
    backgroundImage: String,
  },
  infoOptions: {
    showInfo: Boolean,
  },
  responseOptions: {
    inputStyle: String,
  },
  finishOptions: {
    backgroundImage: String,
    text: String,
    buttons: [
      {
        text: String,
        url: String,
        label: {
          type: Map,
          of: String,
        },
      },
    ],
  },
}

const TemplateSchema = new Schema<Template>({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'name is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  ...TemplateOptions,
})

const TemplateModel = model<Template>('Template', TemplateSchema)

export default TemplateModel
