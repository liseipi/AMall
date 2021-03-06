'use strict'

const PermissionCheckException = use('App/Exceptions/PermissionCheckException')

class Permission {
  async handle({request, response, auth}, next) {

    if (auth.user) {
      let acturl = request.url()
      let permission = await auth.user.can(acturl)
      if (!permission) {
        throw new PermissionCheckException('权限出错', 403)
      }
    }

    await next()
  }
}

module.exports = Permission
