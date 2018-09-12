'use strict'

const {flatten, uniq} = use('lodash')
const Config = use('Config')

class Can {
  register(Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.can = this.can
    Model.prototype.getMenus = this.getMenus
  }

  async can(menus, all = true) {
    const usermenu = await this.getMenus()

    if (Array.isArray(menus)) {
      const result = menus.map(menu => {
        return usermenu.includes(menu)
      })
      return all ? !result.includes(false) : result.includes(true)
    }

    return usermenu.includes(menus)
  }

  async getMenus() {
    const usermenu = await this.menus().fetch()
    const userMenu = usermenu.toJSON().map(menu => menu.controller)

    const roles = await this.roles().with('menus').fetch()
    const _roleMenu = roles.toJSON().map(role => role.menus)
    const roleMenu = flatten(_roleMenu).map(menu => menu.controller)

    return uniq([...userMenu, ...roleMenu, ...Config.get('no_auth.no_menus')])
  }
}

module.exports = Can
