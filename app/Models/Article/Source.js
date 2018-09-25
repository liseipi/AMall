'use strict'

const Model = use('Model')

class Source extends Model {

  //设置表名
  static get table() {
    return 'ni_article_sources'
  }

  //设置表主键为ni_id
  static get primaryKey() {
    return 'ni_id'
  }

  //取消创建时间字段
  static get createdAtColumn () {
    return null
  }

  //取消更新时间字段
  static get updatedAtColumn () {
    return null
  }

}

module.exports = Source
