'use strict'

const User = use('App/Models/User')
const Menu = use('App/Models/Menu')

const Handle = use('App/Helpers/Handle')

class HomeController {

  async Index({ view }) {

    const menus = await Menu.query().where('run_status', 0).fetch()
    const menusData = await Handle.treeSort(menus.toJSON())

    return view.render('index', { menusData })

  }

  async Dashboard({ auth }) {
    const user = await auth.user
    const menu = await user.getMenus()
    const role = await user.getRoles()
    // const result = await user.can(['/dashboard', '/menu/del'])
    const result = await user.is('admin')
    return {menu, result, role}
  }

}

module.exports = HomeController
