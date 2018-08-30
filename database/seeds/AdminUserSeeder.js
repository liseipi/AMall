'use strict'

/*
|--------------------------------------------------------------------------
| AdminUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')

class AdminUserSeeder {
  async run() {

    await User.create({ 
      username: 'oli liu ', 
      email: 'oli@qq.com', 
      password: 'asdasdasd',
      user_status: 0,
      is_active: 1,
      avatar: 'christian.jpg'
    })

  }
}

module.exports = AdminUserSeeder
