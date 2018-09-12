'use strict'

class userEdit {

  get rules () {
    return {
      'username': 'required_if:username|min:6|max:32|unique:ni_admin_user|not_in:root,admin,super',
      'email': 'required_if:email|email|unique:ni_admin_user',
      'password': 'required_if:password|min:8|max:32',
      'repassword': 'required_if:password|same:password'
    }
  }
  get messages(){
    return {
      'required': '这个 {{field}} 字段不为空.',
      'unique': '这个 {{field}} 字段已被使用.',
      'repassword.same': '两次密码不相同.',
      'password.min': '密码最小8位.',
      'password.max': '密码最大64位.',
    }
  }
  async fails (errorMessages){
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }

}

module.exports = userEdit
