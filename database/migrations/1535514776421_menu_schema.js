'use strict'

const Schema = use('Schema')

class MenuSchema extends Schema {
  up () {
    this.create('ni_menus', (table) => {
      table.increments('ni_id')
      table.string('menuname').notNullable().comment('菜单名称')
      table.integer('parent_id').notNullable().comment('父级ID')
      table.string('controller').notNullable().unique().comment('控制器名称')
      table.boolean('run_status').defaultTo(1).comment('状态 0：显示左侧菜单，1：隐藏链接处理')
      table.integer('menu_sort').defaultTo(100).comment('排序')
    })
    .raw("ALTER TABLE `ni_menus` AUTO_INCREMENT=100")
  }

  down () {
    this.drop('ni_menus')
  }
}

module.exports = MenuSchema
