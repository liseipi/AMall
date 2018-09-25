'use strict'

const Schema = use('Schema')

class ArticleRelatedToLabelSchema extends Schema {
  up () {
    this.create('ni_article_relations_label', (table) => {
      table.increments('ni_id')
      table.integer('article_id').unsigned().index()
      table.foreign('article_id').references('ni_article.ni_id').onDelete('CASCADE')
      table.integer('label_id').unsigned().index()
      table.foreign('label_id').references('ni_article_label.ni_id').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_article_relations_label')
  }
}

module.exports = ArticleRelatedToLabelSchema
