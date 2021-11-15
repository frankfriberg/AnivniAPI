import jwt from 'jsonwebtoken'

const { TokenExpiredError } = jwt

export default function auth(req, res, next) {
  const authHeader = req.headers['authorization']

  if (!authHeader)
    return res
      .status(403)
      .json({ message: 'A token is required for authentication.' })

  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    req.user = decoded
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        message: 'Unauthorized: Token expired',
      })
    }

    return res.status(401).json({ message: 'Unauthorized' })
  }
  return next()
}
