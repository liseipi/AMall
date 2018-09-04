'use strict'

class Is {
  async handle ({ auth }, next, args) {

    const roles = args
    const result = await auth.user.is(roles)
    if(!result){
      console.log(666)
      console.log(result)
    }

    await next()
  }
}

module.exports = Is
