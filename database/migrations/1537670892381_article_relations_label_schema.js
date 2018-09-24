'use strict'

const Schema = use('Schema')

class ArticleRelatedToLabelSchema extends Schema {
  up () {
    this.create('ni_article_relations_label', (table) => {
      table.increments('ni_id')
      table.integer('article_id')
      table.integer('label_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_article_relations_label')
  }
}

module.exports = ArticleRelatedToLabelSchema
