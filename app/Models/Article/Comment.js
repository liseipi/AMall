'use strict'

const Model = use('Model')

class Comment extends Model {
  // 设置表名
  static get table() {
    return 'ni_article_comment'
  }

  // 设置表主键为ni_id
  static get primaryKey() {
    return 'ni_id'
  }

  // 格式时间
  static castDates(field, value) {
    if (field === 'updated_at') {
      return value.locale('zh-cn').fromNow()
    }
    return super.formatDates(field, value)
  }

  // 文章
  article() {
    return this.belongsTo('App/Models/Article/Article')
  }

  // 会员
  member() {
    return this.belongsTo('App/Models/Member/Member')
  }

  // 回复
  reply() {
    return this.hasMany('App/Models/Article/Reply')
  }

  // 点赞
  like() {
    return this
      .hasMany('App/Models/Article/Like')
  }

}

module.exports = Comment
