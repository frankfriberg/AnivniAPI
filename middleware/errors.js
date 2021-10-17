import { GeneralError } from '../helpers/error'

function ErrorHandler(err, req, res, next) {
  let returning = {
    status: 'error',
    message: err.message,
  }

  if (err instanceof GeneralError) {
    if (err.target) returning = { ...returning, target: err.target }
    return res.status(err.getCode()).json(returning)
  }

  return res.status(500).json(returning)
}

export default ErrorHandler
