'use strict'

const Model = use('Model')

class Reply extends Model {

  //设置表名
  static get table() {
    return 'ni_article_relations_comment_reply'
  }

  //设置表主键为ni_id
  static get primaryKey() {
    return 'ni_id'
  }

  //对应评论
  comment(){
    return this.belongsTo('App/Models/Article/Comment')
  }

}

module.exports = Reply
