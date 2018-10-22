'use strict'

class MemberController {

  async list({view}){
    return view.render('member.list')
  }

  async add({view}){
    return view.render('member.add')
  }

}

module.exports = MemberController
