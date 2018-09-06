'use strict'

class menu {
  get rules () {
    return {
      'parent_id': 'required|integer',
      'menu_name': 'required',
      'controller': 'required',
      'run_status': 'required|integer',
    }
  }
  get messages(){
    return {
      'required': '这个 {{field}} 字段不为空.',
      'integer': '这个 {{field}} 字段为数字.'
    }
  }
  async fails (errorMessages){
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = menu
