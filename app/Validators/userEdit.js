'use strict'

class userEdit {

  get rules () {
    return {
      'password': 'required_if:password|min:8|max:32',
      'repassword': 'required_if:password|same:password'
    }
  }
  get messages(){
    return {
      'password.required_if': '填写修改的新密码.',
      'repassword.required_if': '填写重复的新密码.',
      'repassword.same': '两次密码不相同.',
      'password.min': '密码最小8位.',
      'password.max': '密码最大32位.',
    }
  }
  async fails (errorMessages){
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }

}

module.exports = userEdit
