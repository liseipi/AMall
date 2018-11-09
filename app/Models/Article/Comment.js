'use strict'

const Model = use('Model')

class Comment extends Model {
  //设置表名
  static get table() {
    return 'ni_article_comment'
  }

  //设置表主键为ni_id
  static get primaryKey() {
    return 'ni_id'
  }

  // 文章
  article() {
    return this.belongsTo('App/Models/Article/Article')
  }

  // 会员
  member() {
    return this.belongsTo('App/Models/Member/Member')
  }

  // 回复层/回复ID
  reply(){
    return this.hasMany('App/Models/Article/Reply')
  }
}

module.exports = Comment
