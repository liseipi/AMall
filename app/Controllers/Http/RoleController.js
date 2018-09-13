'use strict'

const Role = use('App/Models/Role')
const Menu = use('App/Models/Menu')
const Handle = use('App/Helpers/Handle')
const { alertPrompt } = use('App/Helpers/AlertPrompt')
const lodash = use('lodash')

class RoleController {

  async List({view}) {

    const roleData = await Role.all()

    return view.render('role.list', {roleData: roleData.toJSON()})
  }

  async Add({view}) {

    const menusData = await Menu.query()

    const formatData = await Handle.treeSort(menusData)

    return view.render('role.add', {menusData: formatData})
  }

  async AddSave({ request, session, response }){

    const saveData = request.only(['role_name', 'role_desc'])
    const roles = request.only(['role_auth'])

    try {
      const role = await Role.create(saveData)
      await role.menus().attach(roles.role_auth)
      alertPrompt({session, response, title: 'OK', type: 'success', message: '创建成功!', responseURL: '/manager/role'})
    } catch (error) {
      alertPrompt({session, response, title: 'Error', type: 'error', message: `创建失败! Error: ${error}`, responseURL: 'back'})
    }

  }

  async Edit ({ view, params: {id} }){
    const role = await Role.findOrFail(id)
    await role.load('menus', builder => {
      return builder.select('ni_id')
    })
    const roleMenu = lodash._.map(role.toJSON().menus, 'ni_id')
    const menusData = await Menu.query()

    const formatData = await Handle.treeSort(menusData)

    return view.render('role.edit', {menusData: formatData, roleInfo: role.toJSON(), roleMenu})
  }

  async EditSave({ request, response, params: {id}, session }){

    const saveData = request.only(['role_name', 'role_desc'])
    const { role_auth } = request.all()

    try {
      const role = await Role.findOrFail(id)
      role.merge(saveData)
      await role.save()

      await role.menus().sync(role_auth)

      alertPrompt({session, response, title: 'OK', type: 'success', message: '编辑成功!', responseURL: '/manager/role'})
    } catch (error) {
      alertPrompt({session, response, title: 'Error', type: 'error', message: `编辑失败! Error: ${error}`, responseURL: 'back'})
    }
  }

  async Destroy({ response, params: {id}, session }){

    try {
      const role = await Role.findOrFail(id)
      await role.menus().detach()
      await role.delete()

      alertPrompt({session, response, title: 'OK', type: 'success', message: '删除成功!', responseURL: '/manager/role'})
    } catch (error) {
      alertPrompt({session, response, title: 'Error', type: 'error', message: `删除失败! Error: ${error}`, responseURL: 'back'})
    }
  }

}

module.exports = RoleController
