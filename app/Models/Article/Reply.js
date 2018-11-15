'use strict'

const Model = use('Model')

class Reply extends Model {

  // 设置表名
  static get table() {
    return 'ni_article_reply'
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

  // 对应评论
  comment() {
    return this
      .belongsTo('App/Models/Article/Comment')
  }

  // 会员
  member() {
    return this.belongsTo('App/Models/Member/Member')
  }

  // 点赞
  like() {
    return this
      .hasMany('App/Models/Article/Like')
  }

}

module.exports = Reply
