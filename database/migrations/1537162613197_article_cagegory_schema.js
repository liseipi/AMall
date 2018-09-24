'use strict'

const Schema = use('Schema')

class ArticleCagegorySchema extends Schema {
  up () {
    this.create('ni_article_category', (table) => {
      table.increments('ni_id')
      table.string('column_name').notNullable().comment('栏目名称')
      table.integer('parent_id').notNullable().comment('父级ID')
      table.string('controller').comment('路由名称')
      table.text('column_desc').comment('描述')
      table.integer('column_sort').comment('排序')
      table.boolean('column_status').defaultTo(0).comment('状态: (0=显示), (1=隐藏)')
      table.integer('column_type').comment('类型')
      table.timestamps()
    })
      .raw("ALTER TABLE `ni_article_category` AUTO_INCREMENT=1000")
  }

  down () {
    this.drop('ni_article_categories')
  }
}

module.exports = ArticleCagegorySchema
