'use strict'

const Schema = use('Schema')

class MemberLevelSchema extends Schema {
  up () {
    this.create('ni_member_level', (table) => {
      table.increments('ni_id')
      table.string('level_name').notNullable().comment('级别名称')
      table.integer('min_order').notNullable().comment('当前级别最小订单数')
      table.integer('min_amount').notNullable().comment('当前级别最小购物金额数')
      table.integer('min_points').notNullable().comment('当前级别购物最小积分')
      table.text('level_note').comment('级别备注')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_member_level')
  }
}

module.exports = MemberLevelSchema
