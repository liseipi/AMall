'use strict'

const Schema = use('Schema')

class ArticleLabelSchema extends Schema {
  up () {
    this.create('ni_article_label', (table) => {
      table.increments('ni_id')
      table.string('label_name').notNullable().comment('栏目名称')
      table.text('label_desc').comment('描述')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_article_label')
  }
}

module.exports = ArticleLabelSchema
