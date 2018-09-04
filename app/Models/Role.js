'use strict'

const Model = use('Model')

class Role extends Model {

  //设置管理员表名
  static get table() {
    return 'ni_roles'
  }

  //设置表主键为ni_id
  static get primaryKey() {
    return 'ni_id'
  }

  menus() {
    return this
      .belongsToMany('App/Models/Menu')
      .pivotTable('ni_role_menu')
  }

}

module.exports = Role
