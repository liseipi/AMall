'use strict'

const Schema = use('Schema')

class ArticleReplySchema extends Schema {
  up () {
    this.create('ni_article_reply', (table) => {
      table.increments('ni_id')
      table.integer('comment_id').unsigned().index()
      table.foreign('comment_id').references('ni_article_comment.ni_id').onDelete('CASCADE')
      table.integer('member_id').unsigned().index()
      table.foreign('member_id').references('ni_member.ni_id').onDelete('CASCADE')
      table.string('content').comment('评论内容')
      table.string('member_ip').comment('来自会员的IP位置')
      table.boolean('current_comment_state').defaultTo(0).comment('评论的状态，禁止/显示')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_article_reply')
  }
}

module.exports = ArticleReplySchema
