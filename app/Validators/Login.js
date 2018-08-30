'use strict'

class Login {
  get rules () {
    return {
      'email': 'required|email',
      'password': 'required|min:8'
    }
  }
  get messages(){
    return {
      'required': '这个 {{field}} 字段不为空.',
      'email.email': '请填写正确的邮箱地址.',
      'password.min': '密码长度不小于8位.'
    }
  }
  async fails (errorMessages){
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = Login
