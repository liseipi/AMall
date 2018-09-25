'use strict'

class article {
  get rules () {
    return {
      'category_id': 'required|integer',
      'title': 'required'
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

module.exports = article
