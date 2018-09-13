'use strict'

class AlertPrompt {

  static async alertPrompt (args) {

    const {session, response, title, type, message, responseURL} = args

    session.flash({
      notification: {
        title: title,
        type: type,
        message: message
      }
    })
    await session.commit()

    return response.redirect(responseURL || 'back')

  }

}

module.exports = AlertPrompt
