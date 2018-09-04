'use strict'

const Menu = use('App/Models/Menu')
const {treeSoleSort} = use('App/Helpers/Handle')

class MenuController {

  async List({view}) {

    const menusData = await Menu.query()

    const formatData = await treeSoleSort(menusData)

    return view.render('menus.list', {menusData: formatData})
  }

  async Add({view}) {
    return view.render('menus.add')
  }

}

module.exports = MenuController
