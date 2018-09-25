'use strict'

const Model = use('Model')

class Article extends Model {

  //设置表名
  static get table() {
    return 'ni_article'
  }

  //设置表主键为ni_id
  static get primaryKey() {
    return 'ni_id'
  }

  // 分类
  category () {
    return this.belongsTo('App/Models/Article/Category')
  }

  // 类型
  types() {
    return this
      .belongsToMany('App/Models/Article/Type')
      .pivotTable('ni_article_relations_type')
      .withTimestamps()
  }

  // 类型
  labels() {
    return this
      .belongsToMany('App/Models/Article/Label')
      .pivotTable('ni_article_relations_label')
      .withTimestamps()
  }

}

module.exports = Article
