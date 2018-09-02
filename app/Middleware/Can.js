'use strict'

class Can {
  async handle ({ auth }, next, args) {
    // call next to advance the request
    const menus = args
    const can = await auth.user.can(menus)
    if(!can){
      console.log('error: 999')
    }
    await next()
  }
}

module.exports = Can
