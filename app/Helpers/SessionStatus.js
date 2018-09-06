'use strict'

// const session = use('session')

class SessionStatusClass {

  static alertStatus(args) {

    const {session, response, title, type, message, responseURL} = {...args}

    session.flash({
      notification: {
        title: title,
        type: type,
        message: message
      }
    })

    response.redirect(responseURL || 'back')

    return
  }

}

module.exports = SessionStatusClass
