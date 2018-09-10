'use strict'

const Schema = use('Schema')

class RoleSchema extends Schema {
  up () {
    this.create('ni_roles', (table) => {
      table.increments('ni_id')
      table.string('role_name').unique()
      table.string('role_desc')
    })
  }

  down () {
    this.drop('ni_roles')
  }
}

module.exports = RoleSchema
