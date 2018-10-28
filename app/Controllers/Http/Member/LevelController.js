'use strict'

const Level = use('App/Models/Member/Level')

const {filterFieldData} = use('App/Helpers/Handle')
const {alertPrompt} = use('App/Helpers/AlertPrompt')

const LevelTable = 'ni_member_level'

class LevelController {

  async list({view}) {
    const levelData = await Level.all()
    return view.render('member.level_list', {levelData: levelData.toJSON()})
  }

  add({view}) {
    return view.render('member.level_add')
  }

  async addSave({request, response, session}) {

    const saveData = await filterFieldData(LevelTable, request.post())

    try {
      await Level.create(saveData)
      alertPrompt({session, response, title: 'OK', type: 'success', message: '创建成功!', responseURL: '/member/level'})
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

  async edit({view, params: {id}}) {
    const levelInfo = await Level.find(id)
    return view.render('member.level_edit', {levelInfo})
  }

  async editSave({request, response, session, params: {id}}) {
    const saveData = await filterFieldData(LevelTable, request.post())

    try {
      let levelInfo = await Level.findOrFail(id)
      levelInfo.merge(saveData)
      await levelInfo.save()

      alertPrompt({session, response, title: 'OK', type: 'success', message: '修改成功!', responseURL: '/member/level'})
    } catch (error) {
      alertPrompt({
        session,
        response,
        title: 'Error',
        type: 'error',
        message: `修改失败! Error: ${error}`,
        responseURL: 'back'
      })
    }
  }

  async destroy() {

  }

}

module.exports = LevelController
