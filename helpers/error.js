class GeneralError extends Error {
  constructor(message, target) {
    super()
    this.message = message

    if (target) this.target = target
  }

  getCode() {
    if (this instanceof BadRequest) return 400
    if (this instanceof NotFound) return 404
    if (this instanceof Unauthorized) return 401
    return 500
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {}

export { GeneralError, BadRequest, NotFound, Unauthorized }
