'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class PermissionCheckException extends LogicalException {
  /**
   * Handle this exception by itself
   */

  async handle (error, { session, response, request }) {
    session.flash({
      notification: {
        title: 'Error',
        type: 'error',
        message: '权限出错！'
      }
    })
    await session.commit()
    //return response.redirect('back')
    return response.redirect('/dashboard')
  }
}

module.exports = PermissionCheckException
