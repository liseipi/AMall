'use strict'

const User = use('App/Models/User')
const Menu = use('App/Models/Menu')

const { uniq } = use('lodash')

const Config = use('Config')

const Handle = use('App/Helpers/Handle')

class HomeController {

  async Index({ view, auth }) {
    const noMenus = await Menu.query().whereIn('controller', Config.get('no_auth.no_menus')).fetch()

    //const menus = await auth.user.menus().fetch()
    const menus = await auth.user
      .menus()
      //.where('run_status', 0)
      .where(function () {
        this.where('run_status', 0)
          .whereNotIn('controller', Config.get('no_auth.no_menus'))
      })
      .fetch()

    //console.log(noMenus.toJSON())
    //console.log(menus.toJSON())
    //console.log(uniq([...noMenus.toJSON(), ...menus.toJSON()]))

    const menusData = await Handle.treeSort(uniq([...noMenus.toJSON(), ...menus.toJSON()]))

    return view.render('index', { menusData })

  }

  async Dashboard({ view }) {
    return view.render('home.dashboard')
  }

}

module.exports = HomeController
