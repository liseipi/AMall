'use strict'

const Schema = use('Schema')

class MemberProfileSchema extends Schema {
  up () {
    this.create('ni_member_profile', (table) => {
      table.increments('ni_id')
      table.integer('member_id').unsigned().comment('会员ID')
      table.foreign('member_id').references('ni_member.ni_id')
      table.boolean('status').defaultTo(false).comment('开/关登录状态')
      table.string('avatar').comment('头像图片')
      table.integer('level').defaultTo(0).comment('会员级别')
      table.boolean('user_sex').defaultTo(false).comment('会员性别 (F:男，T:女)')
      table.dateTime('birthday').comment('生日')
      table.boolean('is_verify_mobile').defaultTo(false).comment('是否验证手机')
      table.boolean('is_verify_email').defaultTo(false).comment('是否验证手机')
      table.string('verify_send_code').comment('发送的验证码')
      table.string('verify_send_number').comment('连续发送的次数')
      table.string('verify_send_time').comment('上次发送的时间')
      table.integer('access_count').defaultTo(0).comment('登录次数')
      table.integer('source').defaultTo(0).comment('注册来源')
      table.integer('device').defaultTo(0).comment('注册终端设备(0:PC)(1:Mobile)(2:APP)')
      table.string('lastIp').comment('上次IP')
      table.dateTime('last_at').comment('上次时间')
      table.string('thisIp').comment('本次IP')
      table.dateTime('this_at').comment('本次时间')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_member_profile')
  }
}

module.exports = MemberProfileSchema
