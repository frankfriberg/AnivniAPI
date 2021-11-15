import { google } from 'googleapis'
import User from './user.controller'
import Guest from './guest.controller'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
  ],
})

google.options({
  auth: auth,
  headers: { 'Content-Type': 'application/json' },
})

const sheets = google.sheets('v4')

export function add(spreadsheetId, table = 'Sheet1', data) {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values
      .append({
        spreadsheetId: spreadsheetId,
        range: `${table}!A1:Z`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [data],
        },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}
