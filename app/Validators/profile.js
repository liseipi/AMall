'use strict'

const hashVerified = use('App/Helpers/HashVerified')

class profile {
  get rules () {
    const user = this.ctx.auth.user
    return {
      'oldpassword': `required_if:oldpassword|hashVerified:${user.password}`,
      'password': 'required_if:password|required_if:oldpassword|min:8|max:32',
      'repassword': 'required_if:password|same:password',
      'birthday': 'required_if:birthday|date',
    }
  }
  get messages(){
    return {
      'oldpassword.hashVerified': '原始密码不正确.',
      'password.required_if': '填写修改的新密码.',
      'repassword.required_if': '重复填写新密码.',
      'repassword.same': '重复密码不一致.',
      'password.min': '密码长度不小于8位.',
      'password.max': '密码最大32位.'
    }
  }
  async fails (errorMessages){
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = profile
