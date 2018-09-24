'use strict'

const Schema = use('Schema')

class ArticleRelatedToCategorySchema extends Schema {
  up () {
    this.create('ni_article_relations_category', (table) => {
      table.increments('ni_id')
      table.integer('article_id')
      table.integer('category_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_article_relations_category')
  }
}

module.exports = ArticleRelatedToCategorySchema
