'use strict'

const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Menu = use('App/Models/Menu')
const Hash = use('Hash')

const lodash = use('lodash')
const Handle = use('App/Helpers/Handle')
const {alertStatus} = use('App/Helpers/SessionStatus')

const userTable = 'ni_admin_user'

class UserController {

  async List({ view }){

    const userData = await User
      .query()
      .with('roles', builder=>{ builder.select('role_name') })
      //.with('menus')
      .fetch()

    return view.render('user.list', { userData: userData.toJSON() })
  }

  async Add({ view }){
    const roles = await Role
      .query()
      .with('menus', builder=>builder.select('ni_id'))
      .fetch()

    const menusData = await Menu.query()
    const formatData = await Handle.treeSort(menusData)

    return view.render('user.add', { roles: roles.toJSON(), menusData: formatData })
  }

  async AddSave({ request, response, session }){
    const saveData = await Handle.filterFieldData(userTable, request.post())
    const { menu_id } = request.only(['menu_id'])
    console.log(saveData)
    try {
      const user = await User.create(saveData)

      if(menu_id){
        await user.menus().attach(menu_id)
      }
      if(saveData.user_role>0){
        await user.roles().attach([saveData.user_role])
      }

      alertStatus({session, response, title: 'OK', type: 'success', message: '创建成功!', responseURL: '/manager/user'})
    } catch (error) {
      console.log(error)
      alertStatus({session, response, title: 'Error', type: 'error', message: '创建失败!', responseURL: 'back'})
    }
  }

  async Edit({ view, params: {id} }){

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
      .with('menus', builder=>builder.select('ni_id'))
      .fetch()

    const menusData = await Menu.query()
    const formatData = await Handle.treeSort(menusData)

    return view.render('user.edit', { roles: roles.toJSON(), menusData: formatData, userInfo: userInfo.toJSON(), userMenu })
  }

  async EditSave({ request, response, session, params:{id} }){
    const saveData = await Handle.filterFieldData(userTable, request.post())
    const { menu_id } = request.only(['menu_id'])
    const { user_role } = request.only(['user_role'])

    try {
      const user = await User.findOrFail(id)
      if(saveData.password){
        const password = await Hash.make(saveData.password)
        saveData.password = password
      }else{
        delete saveData.password
      }
      user.merge(saveData)
      await user.save()

      await user.menus().sync(menu_id)
      if(user_role>0){
        await user.roles().sync(user_role)
      }

      alertStatus({session, response, title: 'OK', type: 'success', message: '编辑成功!', responseURL: '/manager/user'})
    } catch (error) {
      alertStatus({session, response, title: 'Error', type: 'error', message: '编辑失败!', responseURL: 'back'})
    }
  }

  async Destroy({ response, session, params:{id} }){

    try {
      const user = await User.findOrFail(id)
      await user.menus().detach()
      await user.roles().detach()
      await user.delete()

      alertStatus({session, response, title: 'OK', type: 'success', message: '删除成功!', responseURL: '/manager/user'})
    } catch (error) {
      alertStatus({session, response, title: 'Error', type: 'error', message: '删除失败!', responseURL: 'back'})
    }
  }

}

module.exports = UserController
