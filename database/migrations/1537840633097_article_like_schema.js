'use strict'

const Schema = use('Schema')

class ArticleCommentLikeSchema extends Schema {
  up () {
    this.create('ni_article_like', (table) => {
      table.increments('ni_id')
      table.integer('article_id').defaultTo(0).unsigned().index().comment('赞的ID(文章)')
      table.integer('comment_id').defaultTo(0).unsigned().index().comment('赞的ID(评论)')
      table.integer('reply_id').defaultTo(0).unsigned().index().comment('赞的ID(回复)')
      table.integer('member_id').unsigned().index()
      table.foreign('member_id').references('ni_member.ni_id').onDelete('CASCADE')
      table.string('member_ip').comment('来自会员的IP位置')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_article_like')
  }
}

module.exports = ArticleCommentLikeSchema
