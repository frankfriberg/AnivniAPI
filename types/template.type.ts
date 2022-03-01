import { Document } from 'mongoose'

interface TemplateButton {
  url: string
  label: {
    [language: string]: string
  }
}

export interface TemplateBaseOptions {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  fontColor: string
  fontFamily: string
  buttonStyle: string
}

export interface TemplateInviteOptions {
  title: {
    fontFamily: string
    fontSize: string
    fontColor: string
    fontWeight: string
    textAlign: string
  }
  subtitle: {
    beforeTitle: boolean
    fontFamily: string
    fontSize: string
    fontColor: string
    fontWeight: string
    textAlign: string
  }
  date: {
    style: string
    fontFamily: string
    size: string
  }
  topImage: string
  bottomImage: string
  backgroundImage: string
}

export interface TemplateInfoOptions {
  showInfo: boolean
}

export interface TemplateResponseOptions {
  inputStyle: string
}

export interface TemplateFinishOptions {
  backgroundImage: string
  text: string
  buttons: [TemplateButton]
}

export interface Template extends Document {
  name: string
  description: string
  baseOptions: TemplateBaseOptions
  inviteOptions: TemplateInviteOptions
  infoOptions: TemplateInfoOptions
  responseOptions: TemplateResponseOptions
  finishOptions: TemplateFinishOptions
}
