'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('ni_admin_user', (table) => {
      table.increments('ni_id')
      table.string('email').notNullable().unique().comment('邮箱')
      table.string('password').notNullable().comment('密码')
      table.string('username').notNullable().unique().comment('用户名')
      table.string('avatar').comment('头像')
      table.string('mobile').comment('手机')
      table.dateTime('birthday').comment('生日')
      // table.boolean('user_role').defaultTo(0).comment('管理员角色(无角色:0)')
      table.boolean('user_sex').defaultTo(0).comment('性别(男:0,女:1)')
      table.boolean('user_status').defaultTo(1).comment('用户状态(开启:0,关闭:1)')
      table.integer('login_count').defaultTo(0).comment('登录次数')
      table.string('confirm_token').comment('验证码')
      table.string('is_active').defaultTo(0).comment('是否已经验证通过(未验证:0,已通过:1)')
      table.string('last_ip').comment('上次登录IP')
      table.dateTime('last_at').comment('上次登录时间')
      table.string('updated_ip').comment('当前登录IP')
      table.timestamps()
    })
      .raw("ALTER TABLE `ni_admin_user` AUTO_INCREMENT=8985")
  }

  down () {
    this.drop('ni_admin_user')
  }
}

module.exports = UserSchema
