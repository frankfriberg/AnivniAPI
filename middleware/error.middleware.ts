// import { HttpError } from '../helpers/error'
// import { Response } from 'express'

// function ErrorHandler(err: Error, res: Response) {
//   let returning = {
//     status: 'error',
//     message: err.message,
//   }

//   if (err instanceof HttpError) {
//     if (err.code) returning = { ...returning, code: err.code }
//     return res.status(err.getCode()).json(returning)
//   }

//   return res.status(500).json(returning)
// }

// export default ErrorHandler

import { NextFunction, Request, Response } from 'express'
import HttpException from '../helpers/error'

export default function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'

  response.status(status).json({
    status,
    message,
  })
}
