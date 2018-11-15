'use strict'

const Schema = use('Schema')

class MemberSchema extends Schema {
  up() {
    this.create('ni_member', (table) => {
      table.increments('ni_id')
      table.string('username').notNullable().unique().comment('会员名称')
      table.string('password').notNullable().comment('密码')
      table.string('email').notNullable().unique().comment('邮箱')
      table.timestamps()
    })
      .raw("ALTER TABLE `ni_member` AUTO_INCREMENT=85860")
  }

  down() {
    this.drop('ni_member')
  }
}

module.exports = MemberSchema
