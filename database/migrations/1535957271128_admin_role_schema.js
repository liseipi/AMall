'use strict'

const Schema = use('Schema')

class UserRoleSchema extends Schema {
  up () {
    this.create('ni_admin_role', (table) => {
      table.increments('ni_id')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('ni_admin_user.ni_id').onDelete('CASCADE')
      table.integer('role_id').unsigned().index()
      table.foreign('role_id').references('ni_roles.ni_id').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('ni_admin_role')
  }
}

module.exports = UserRoleSchema
