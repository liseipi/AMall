'use strict'

/*
|--------------------------------------------------------------------------
| 03_AdminPermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')
const Env = use('Env')

class AdminPermissionSeeder {
  async run () {

    const user = await User.query().where({ email: Env.get('ADMIN_EMAIL') }).first()
    await user.menus().attach([100, 150, 151, 152, 153, 154, 450, 451, 452, 453, 454, 455, 456, 457, 458])

  }
}

module.exports = AdminPermissionSeeder
