'use strict'

const Hash = use('Hash')

const Member = use('App/Models/Member/Member')
const Level = use('App/Models/Member/Level')

const {filterFieldData} = use('App/Helpers/Handle')
const {alertPrompt} = use('App/Helpers/AlertPrompt')

const profileTable = 'ni_member_profile'

class MemberController {

  async list({view, request}) {
    const query = request.get()
    const page = query.page || 1
    const perPage = 20
    const type = query.type || 'all'
    const level_id = Number(query.level_id) || -1
    const keywords = query.keywords || ''

    const memberData = await Member
      .query()
      .select('ni_id', 'username', 'email')
      .with('profile', builder => builder.select('ni_id', 'member_id', 'mobile', 'status', 'is_verify_mobile', 'is_verify_email'))
      .with('level', builder => {
        return builder.select('level_id', 'member_id')
      })
      .whereHas('profile', (builder) => {
        if (['ni_id', 'username', 'email', 'mobile'].includes(type)) {
          builder.where(type, 'like', `%${keywords}%`)
        }
        return builder
      })
      .whereHas('level', (builder) => {
        if (level_id >= 0) {
          builder.where('level_id', level_id)
        }
        return builder
      })
      .paginate(page, perPage)

    const levelData = await Level.query().select('ni_id', 'level_name').fetch()
    return view.render('member.list', {memberData: memberData.toJSON(), levelData: levelData.toJSON(), query})
  }

  async add({view}) {
    const levelData = await Level.query().select('ni_id', 'level_name').fetch()
    return view.render('member.add', {levelData: levelData.toJSON()})
  }

  async addSave({request, response, session}) {
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

      alertPrompt({session, response, title: 'OK', type: 'success', message: '创建成功!', responseURL: '/member/list'})
    } catch (error) {
      alertPrompt({
        session,
        response,
        title: 'Error',
        type: 'error',
        message: `创建失败! Error: ${error}`,
        responseURL: 'back'
      })
    }

  }

}

module.exports = MemberController
