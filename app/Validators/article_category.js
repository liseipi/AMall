'use strict'

class article_category {
  get rules () {
    return {
      'parent_id': 'required|integer',
      'column_name': 'required',
      'controller': 'required',
      'column_status': 'required|integer',
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

module.exports = article_category
