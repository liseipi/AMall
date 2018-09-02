'use strict'

const Schema = use('Schema')

class AdminPermissionSchema extends Schema {
  up () {
    this.create('ni_admin_permission', (table) => {
      table.increments('ni_id')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('ni_admin_user.ni_id').onDelete('CASCADE')
      table.integer('menu_id').unsigned().index()
      table.foreign('menu_id').references('ni_menus.ni_id').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_admin_permission')
  }
}

module.exports = AdminPermissionSchema
