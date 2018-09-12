'use strict'

class store {
  get rules () {
    return {
      'store_name': 'required'
    }
  }
  get messages(){
    return {
      'required': '这个 {{field}} 字段不为空.'
    }
  }
  async fails (errorMessages){
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = store
