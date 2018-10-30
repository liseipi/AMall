'use strict'

const Hash = use('Hash')

const Member = use('App/Models/Member/Member')
const Level = use('App/Models/Member/Level')

const {filterFieldData} = use('App/Helpers/Handle')
const {alertPrompt} = use('App/Helpers/AlertPrompt')

const profileTable = 'ni_member_profile'

class MemberController {

  async list({view}) {

    return view.render('member.list')
  }

  async add({view}) {
    const levelData = await Level.all()
    return view.render('member.add', {levelData: levelData.toJSON()})
  }

  async addSave({request, response}) {
    const {username, email, password, level} = request.only(['username', 'email', 'password', 'level'])
    const profile_field = request.except(['username', 'email', 'password', 'level'])
    const profiles = await filterFieldData(profileTable, profile_field)

    let hashPassword = ''
    if (password) {
      hashPassword = await Hash.make(password)
    }
    try {
      const member = await Member.create({username, email, password: hashPassword})

      if (!await member.hasProfile()) {
        await member.profile().create(profiles)
      } else {
        await member.profile().update(profiles)
      }

      if (!await member.hasLevel()) {
        await member.level().create({level_id: Number(level)})
      } else {
        await member.level().update({level_id: Number(level)})
      }

    } catch (error) {
      console.log(error)
    }

  }

}

module.exports = MemberController
