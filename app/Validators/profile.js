'use strict'

const hashVerified = use('App/Helpers/HashVerified')

class profile {
  get rules () {
    const user = this.ctx.auth.user
    return {
      'oldpassword': `required_if:oldpassword|hashVerified:${user.password}`,
      'password': 'required_if:password|min:8|max:64',
      'repassword': 'required_if:password|same:password',
      'birthday': 'required_if:birthday|date',
    }
  }
  get messages(){
    return {
      'oldpassword.hashVerified': '原始密码不正确.',
      'password.min': '密码长度不小于8位.'
    }
  }
  async fails (errorMessages){
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = profile
