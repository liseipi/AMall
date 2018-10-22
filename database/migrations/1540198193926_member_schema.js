'use strict'

const Schema = use('Schema')

class MemberSchema extends Schema {
  up () {
    this.create('ni_member', (table) => {
      table.increments('ni_id')
      table.string('username').unique().comment('会员名称')
      table.string('password').comment('密码')
      table.string('email').unique().comment('邮箱')
      table.bigInteger('mobile').unique().comment('手机')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_member')
  }
}

module.exports = MemberSchema
