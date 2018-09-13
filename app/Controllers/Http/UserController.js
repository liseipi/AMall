'use strict'

const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Menu = use('App/Models/Menu')
const Hash = use('Hash')

const lodash = use('lodash')
const moment = use('moment')
const Handle = use('App/Helpers/Handle')
const {alertPrompt} = use('App/Helpers/AlertPrompt')

const userTable = 'ni_admin_user'

class UserController {

  async List({view}) {

    const userData = await User
      .query()
      .with('roles', builder => {
        builder.select('role_name')
      })
      //.with('menus')
      .fetch()

    return view.render('user.list', {userData: userData.toJSON()})
  }

  async Add({view}) {
    const roles = await Role
      .query()
      .with('menus', builder => builder.select('ni_id'))
      .fetch()

    const menusData = await Menu.query()
    const formatData = await Handle.treeSort(menusData)

    return view.render('user.add', {roles: roles.toJSON(), menusData: formatData})
  }

  async AddSave({request, response, session}) {
    const saveData = await Handle.filterFieldData(userTable, request.post())
    const {menu_id} = request.only(['menu_id'])

    try {
      const user = await User.create(saveData)

      if (menu_id) {
        await user.menus().attach(menu_id)
      }
      if (saveData.user_role > 0) {
        await user.roles().attach([saveData.user_role])
      }

      alertPrompt({session, response, title: 'OK', type: 'success', message: '创建成功!', responseURL: '/manager/user'})
    } catch (error) {
      console.log(error)
      alertPrompt({session, response, title: 'Error', type: 'error', message: `创建失败! Error: ${error}`, responseURL: 'back'})
    }
  }

  async Edit({view, params: {id}}) {

    const userInfo = await User.findOrFail(id)
    await userInfo.load('menus', builder => {
      return builder.select('ni_id')
    })
    await userInfo.load('roles', builder => {
      return builder.select('ni_id')
    })
    const userMenu = lodash._.map(userInfo.toJSON().menus, 'ni_id')

    const roles = await Role
      .query()
      .with('menus', builder => builder.select('ni_id'))
      .fetch()

    const menusData = await Menu.query()
    const formatData = await Handle.treeSort(menusData)

    return view.render('user.edit', {roles: roles.toJSON(), menusData: formatData, userInfo: userInfo.toJSON(), userMenu})
  }

  async EditSave({request, response, session, params: {id}}) {
    const body = request.except(['username', 'email'])
    const saveData = await Handle.filterFieldData(userTable, body)

    const {menu_id} = request.only(['menu_id'])
    const {user_role} = request.only(['user_role'])

    if (saveData.password && saveData.password != '') {
    } else {
      delete saveData.password
    }

    try {
      const user = await User.findOrFail(id)
      user.merge(saveData)
      await user.save()

      await user.menus().sync(menu_id)
      if (user_role > 0) {
        await user.roles().sync(user_role)
      }

      alertPrompt({session, response, title: 'OK', type: 'success', message: '编辑成功!', responseURL: '/manager/user'})
    } catch (error) {
      alertPrompt({session, response, title: 'Error', type: 'error', message: `编辑失败! Error: ${error}`, responseURL: 'back'})
    }
  }

  async Destroy({response, session, params: {id}}) {

    try {
      const user = await User.findOrFail(id)
      await user.menus().detach()
      await user.roles().detach()
      await user.delete()

      alertPrompt({session, response, title: 'OK', type: 'success', message: '删除成功!', responseURL: '/manager/user'})
    } catch (error) {
      alertPrompt({session, response, title: 'Error', type: 'error', message: `删除失败! Error: ${error}`, responseURL: 'back'})
    }
  }

  async Profile({view, auth}) {
    const user = await auth.user
    if (user.birthday && user.birthday != '') {
      user.birthday = moment(user.birthday).format('YYYY-MM-DD')
    }
    return view.render('user.profile', {user})
  }

  async ProfileSave({session, response, request, auth}) {
    const body = request.except(['username', 'email'])
    const saveData = await Handle.filterFieldData(userTable, body)

    if (saveData.password && saveData.password != '') {
    } else {
      delete saveData.password
    }

    if (saveData.birthday && saveData.birthday != '') {
      saveData.birthday = moment(saveData.birthday).format('YYYY-MM-DD HH:mm:ss')
    } else {
      delete saveData.birthday
    }

    try {
      const user = await auth.user
      user.merge(saveData)
      await user.save()

      alertPrompt({response, session, "title": "OK", "type": "success", "message": "保存成功!", "responseURL": "back"})
    } catch (error) {
      alertPrompt({response, session, "title": "Error", "type": "error", "message": `保存失败! Error: ${error}`, "responseURL": "back"})
    }
  }

}

module.exports = UserController
