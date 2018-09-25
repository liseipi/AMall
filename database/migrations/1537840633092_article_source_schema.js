'use strict'

const Schema = use('Schema')

class ArticleSourceSchema extends Schema {
  up () {
    this.create('ni_article_sources', (table) => {
      table.increments('ni_id')
      table.string('source_name')
    })
  }

  down () {
    this.drop('ni_article_sources')
  }
}

module.exports = ArticleSourceSchema
