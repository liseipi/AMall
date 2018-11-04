'use strict'

const Schema = use('Schema')

class ArticleCommentLikeSchema extends Schema {
  up () {
    this.create('ni_article_comment_like', (table) => {
      table.increments('ni_id')
      table.integer('article_id').unsigned().index()
      table.foreign('article_id').references('ni_article.ni_id').onDelete('CASCADE')
      table.integer('member_id').unsigned().index()
      table.foreign('member_id').references('ni_member.ni_id').onDelete('CASCADE')
      table.integer('comment_id').comment('赞评论的ID')
      table.integer('floor').comment('楼层(0:顶层, 1:回复顶层)')
      table.string('member_ip').comment('来自会员的IP位置')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_article_comment_like')
  }
}

module.exports = ArticleCommentLikeSchema
