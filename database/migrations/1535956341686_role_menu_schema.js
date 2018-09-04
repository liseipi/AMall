'use strict'

const Schema = use('Schema')

class RoleMenuSchema extends Schema {
  up () {
    this.create('ni_role_menu', (table) => {
      table.increments('ni_id')
      table.integer('role_id').unsigned().index()
      table.foreign('role_id').references('ni_roles.ni_id').onDelete('CASCADE')
      table.integer('menu_id').unsigned().index()
      table.foreign('menu_id').references('ni_menus.ni_id').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('ni_role_menu')
  }
}

module.exports = RoleMenuSchema
