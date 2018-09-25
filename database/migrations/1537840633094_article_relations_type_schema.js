'use strict'

const Schema = use('Schema')

class ArticleRelatedToTypeSchema extends Schema {
  up () {
    this.create('ni_article_relations_type', (table) => {
      table.increments('ni_id')
      table.integer('article_id').unsigned().index()
      table.foreign('article_id').references('ni_article.ni_id').onDelete('CASCADE')
      table.integer('type_id').unsigned().index()
      table.foreign('type_id').references('ni_article_types.ni_id').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_article_relations_type')
  }
}

module.exports = ArticleRelatedToTypeSchema
