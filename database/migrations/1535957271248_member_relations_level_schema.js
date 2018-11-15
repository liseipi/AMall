'use strict'

const Schema = use('Schema')

class MemberRelationsLevelSchema extends Schema {
  up () {
    this.create('ni_member_relations_level', (table) => {
      table.increments('ni_id')
      table.integer('member_id').unsigned().index()
      table.foreign('member_id').references('ni_member.ni_id').onDelete('CASCADE')
      table.integer('level_id').unsigned().index()
      table.foreign('level_id').references('ni_member_level.ni_id').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_member_relations_level')
  }
}

module.exports = MemberRelationsLevelSchema
