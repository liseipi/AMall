'use strict'

const GE = require('@adonisjs/generic-exceptions')

class AbortException extends GE.HttpException {

  static invoke (body, status) {
    const error = new this('Request aborted', status || 400)
    error.body = body || 'Request aborted'
    return error
  }

  async handle (error, { response, session }) {

    if (session && typeof (session.commit) === 'function') {
      await session.commit()
    }

    response.status(error.status).send(error.body)

  }
}


module.exports = AbortException
