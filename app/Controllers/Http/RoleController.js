'use strict'

const Role = use('App/Models/Role')

class RoleController {

  async List({ view }) {

    const roleData = await Role.all()

    return view.render('role.list', { roleData: roleData.toJSON() })
  }

}

module.exports = RoleController
