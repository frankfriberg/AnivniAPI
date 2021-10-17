function Success(req, res, next) {
  res.success = (code, data) => {
    let response = {
      status: 'success',
      code: code,
    }

    if (data) {
      if (typeof data === 'object') {
        response.data = data
      } else {
        response.message = data
      }
    }

    return res.status(code).json(response)
  }

  next()
}

export default Success
