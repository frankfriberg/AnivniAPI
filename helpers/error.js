class GeneralError extends Error {
  constructor(message, target) {
    super()
    this.message = message

    if (target) this.target = target
  }

  getCode() {
    if (this instanceof BadRequest) return 400
    if (this instanceof NotFound) return 404
    return 500
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}

export { GeneralError, BadRequest, NotFound }
