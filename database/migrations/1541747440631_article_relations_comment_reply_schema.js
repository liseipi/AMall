'use strict'

const Schema = use('Schema')

class ArticleRelationsCommentReplySchema extends Schema {
  up () {
    this.create('ni_article_relations_comment_reply', (table) => {
      table.increments()
      table.integer('comment_id').unsigned().index().comment('ni_id: 对应ni_id,回复顶层的评论(多个重复)')
      table.foreign('comment_id').references('ni_article_comment.ni_id').onDelete('CASCADE')
      table.integer('reply_id').unsigned().index().defaultTo(0).comment('ni_id: 对应ni_id(单个唯一对应)，对应回复，并非评论')
      table.foreign('reply_id').references('ni_article_comment.ni_id').onDelete('CASCADE')
      table.integer('parent_comment_id').defaultTo(0).comment('回复 parent 的 ID')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_article_relations_comment_reply')
  }
}

module.exports = ArticleRelationsCommentReplySchema
