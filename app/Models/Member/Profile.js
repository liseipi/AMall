'use strict'

const Model = use('Model')

class Profile extends Model {

  //设置表名
  static get table() {
    return 'ni_member_profile'
  }

  //设置表主键为ni_id
  static get primaryKey() {
    return 'ni_id'
  }

}

module.exports = Profile
