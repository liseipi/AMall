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
const Env = use('Env')

class AdminUserSeeder {
  async run() {

    await User.create({
      username: Env.get('ADMIN_USERNAME'),
      email: Env.get('ADMIN_EMAIL'),
      password: Env.get('ADMIN_PASSWORD'),
      user_status: 0,
      is_active: 1,
      avatar: 'christian.jpg'
    })

  }
}

module.exports = AdminUserSeeder
