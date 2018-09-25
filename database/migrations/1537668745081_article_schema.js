'use strict'

const Schema = use('Schema')

class ArticleSchema extends Schema {
  up () {
    this.create('ni_article', (table) => {
      table.increments('ni_id')
      table.integer('category_id').notNullable().comment('分类栏目ID')
      table.string('title').notNullable().comment('文章标题')
      table.string('vice_title').comment('文章副标题')
      table.string('author').comment('文章作者')
      table.boolean('status').defaultTo(0).comment('状态：(0=显示，1=下线)')
      table.integer('source').comment('文章来源: (1=站内原创，2=改编，3=采集， 4=爬虫)')
      table.string('source_file').comment('爬虫的文件名称')
      table.integer('sort').comment('排序')
      table.string('thumb_img').comment('缩略图片')
      table.string('keywords').comment('关键字')
      table.text('summary_content').comment('概要')
      table.text('content').comment('正文内容')
      table.integer('view_count').defaultTo(0).comment('查看次数')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_article')
  }
}

module.exports = ArticleSchema
