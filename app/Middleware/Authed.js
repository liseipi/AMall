'use strict'

class Authed {
  async handle({ request, response, auth }, next) {
    // call next to advance the request
    try {
      //认证已经登录的用户直接跳到首页
      await auth.check()
      return response.route('HomeController.Index')

    } catch (error) {
      await next()
    }
  }
}

module.exports = Authed
