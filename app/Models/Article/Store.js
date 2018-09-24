'use strict'

const Model = use('Model')

class Store extends Model {

  //设置表名
  static get table() {
    return 'ni_article'
  }

  //设置表主键为ni_id
  static get primaryKey() {
    return 'ni_id'
  }

}

module.exports = Store
