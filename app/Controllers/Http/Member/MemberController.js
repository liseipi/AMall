'use strict'

const Member = use('App/Models/Member/Member')

class MemberController {

  async list({view}){
    return view.render('member.list')
  }

  async add({view}){
    return view.render('member.add')
  }

  async addSave({request, response}){
    const {username, email, password, mobile} = request.all()

    const user = await Member.create({username, email, password, mobile})
    console.log(user)
  }

}

module.exports = MemberController
