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

class AdminPermissionSeeder {
  async run () {

    const user = await User.find(8985)
    await user.menus().attach([450, 451, 452, 453, 454, 455, 456, 457, 458])

  }
}

module.exports = AdminPermissionSeeder
