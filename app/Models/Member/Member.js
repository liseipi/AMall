'use strict'

const Model = use('Model')

class Member extends Model {

  // 设置表名
  static get table() {
    return 'ni_member'
  }

  // 设置表主键为ni_id
  static get primaryKey() {
    return 'ni_id'
  }

  // 判断会员是否有详细信息
  async hasProfile() {
    const profile = await this.profile().fetch()
    if (!profile) {
      return false
    }
    return true
  }

  // 会员详细信息
  profile() {
    return this.hasOne('App/Models/Member/Profile')
    //.withTimestamps()
  }

  // 判断会员是否有级别
  async hasLevel() {
    const profile = await this.level().fetch()
    if (!profile) {
      return false
    }
    return true
  }

  // 会员级别
  level() {
    return this.hasOne('App/Models/Member/MemberLevel')
  }

}

module.exports = Member
