'use strict'

const Menu = use('App/Models/Menu')
const {filterFieldData, treeSoleSort} = use('App/Helpers/Handle')

const MenuTable = 'ni_menus'

const {alertStatus} = use('App/Helpers/SessionStatus')

class MenuController {

  async List({view}) {

    const menusData = await Menu.query()

    const formatData = await treeSoleSort(menusData)

    return view.render('menus.list', {menusData: formatData})
  }

  async Add({view}) {

    const menusData = await Menu.query().setVisible(['ni_id', 'menu_name', 'parent_id']).fetch()

    const formatData = await treeSoleSort(menusData.toJSON())

    return view.render('menus.add', {menusData: formatData})
  }

  async AddSave({request, response, session}) {
    const saveData = await filterFieldData(MenuTable, request.post())

    try {
      await Menu.create(saveData)
      alertStatus({session, response, title: 'OK', type: 'success', message: '创建成功!', responseURL: '/menu/list'})
    } catch (error) {
      alertStatus({session, response, title: 'Error', type: 'error', message: `创建失败! Error: ${error}`, responseURL: 'back'})
    }
  }

  async Edit({view, params: {id}}) {

    const menusData = await Menu.query().setVisible(['ni_id', 'menu_name', 'parent_id']).fetch()

    const formatData = await treeSoleSort(menusData.toJSON())

    const menuInfo = await Menu.findOrFail(id)

    return view.render('menus.edit', {menusData: formatData, menuInfo: menuInfo.toJSON()})
  }

  async EditSave({request, session, response, params: {id}}) {
    const saveData = await filterFieldData(MenuTable, request.post())

    try {
      let menuInfo = await Menu.findOrFail(id)
      menuInfo.merge(saveData)
      await menuInfo.save()
      alertStatus({session, response, title: 'OK', type: 'success', message: '修改成功!', responseURL: '/menu/list'})
    } catch (error) {
      alertStatus({session, response, title: 'Error', type: 'error', message: `修改失败! Error: ${error}`, responseURL: 'back'})
    }
  }

  async Destroy({request, session, response, params: {id}}){
    try {
      const menu = await Menu.findOrFail(id)
      menu.delete()
      alertStatus({session, response, title: 'OK', type: 'success', message: '删除成功!', responseURL: '/menu/list'})
    } catch (error) {
      alertStatus({session, response, title: 'Error', type: 'error', message: `删除失败! Error: ${error}`, responseURL: 'back'})
    }
  }

}

module.exports = MenuController
