'use strict'

/*
|--------------------------------------------------------------------------
| MemberLevelSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Level = use('App/Models/Member/Level')

class MemberLevelSeeder {
  async run() {
    const level = [
      {ni_id: 1, level_name: "无级别", min_order: 0, min_amount: 0, min_points: 0, level_note: "默认无级别"}
    ]
    await Level.createMany(level)
  }
}

module.exports = MemberLevelSeeder
