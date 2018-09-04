'use strict'

class Permission {
  async handle ({ request, auth }, next) {

    let permission = []
    if(auth.user){
      permission = await auth.user.getMenus()
      console.log(permission)

      console.log(request.url())
      let aa = await auth.user.can(request.url())
      console.log(aa)
    }

    await next()
  }
}

module.exports = Permission
