'use strict'

const User = use('App/Models/User')
const Menu = use('App/Models/Menu')

const { uniq } = use('lodash')

const Config = use('Config')

const Handle = use('App/Helpers/Handle')

class HomeController {

  async Index({ view, auth }) {
    const noMenus = await Menu.query().whereIn('controller', Config.get('customData.noAuthMenus')).fetch()

    const menus = await auth.user
      .menus()
      .where(function () {
        this.where('run_status', 0)
          .whereNotIn('controller', Config.get('customData.noAuthMenus'))
      })
      .fetch()

    const authMenus = uniq([...noMenus.toJSON(), ...menus.toJSON()]).filter( item => {
      return item.run_status==0
    })

    const menusData = await Handle.treeSort(authMenus)

    return view.render('index', { menusData })
  }

  async Dashboard({ view }) {
    return view.render('home.dashboard')
  }

}

module.exports = HomeController
