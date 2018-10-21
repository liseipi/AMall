'use strict'

const {flatten, uniq} = use('lodash')
const Config = use('Config')

const pathToRegexp = use('path-to-regexp')

class Can {
  register(Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.can = this.can
    Model.prototype.getMenus = this.getMenus
  }

  async can(menus, all = true) {
    const regMenu = await this.getMenus()
    let result = []

    if (Array.isArray(menus)) {
      const regsItem = regMenu.map(regRoute => {
        return pathToRegexp(regRoute, [])
      })
      result = menus.map(menu => {
        return regsItem.some(reg => reg.test(menu))
      })
      return all ? !result.includes(false) : result.includes(true)
    } else {
      result = regMenu.map(menu => {
        //return request.match([menu])

        return pathToRegexp(menu, []).test(menus)
      })
    }
    return result.includes(true)
  }

  async getMenus() {
    const usermenu = await this.menus().fetch()
    const userMenu = usermenu.toJSON().map(menu => menu.controller)

    const roles = await this.roles().with('menus').fetch()
    const _roleMenu = roles.toJSON().map(role => role.menus)
    const roleMenu = flatten(_roleMenu).map(menu => menu.controller)
    const roleItem = uniq([...userMenu, ...roleMenu, ...Config.get('customData.noAuthMenus')])
    return roleItem
  }
}

module.exports = Can
