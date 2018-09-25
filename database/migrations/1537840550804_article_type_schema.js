'use strict'

const Schema = use('Schema')

class ArticleTypeSchema extends Schema {
  up () {
    this.create('ni_article_types', (table) => {
      table.increments('ni_id')
      table.string('type_name')
    })
  }

  down () {
    this.drop('ni_article_types')
  }
}

module.exports = ArticleTypeSchema
