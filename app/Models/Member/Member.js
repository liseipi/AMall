'use strict'

const Model = use('Model')

class Member extends Model {

  //设置表名
  static get table() {
    return 'ni_member'
  }

  //设置表主键为ni_id
  static get primaryKey() {
    return 'ni_id'
  }

  // 会员详细信息
  profile () {
    return this.hasOne('App/Models/Member/Profile')
  }

}

module.exports = Member
