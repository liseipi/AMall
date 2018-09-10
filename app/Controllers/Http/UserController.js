'use strict'

const User = use('App/Models/User')

class UserController {

  async List({ view }){
    const userData = await User
      .query()
      .with('roles')
      .with('menus')
      .fetch()
    console.log(userData.toJSON())

    return view.render('user.list', { userData: userData.toJSON() })
  }

}

module.exports = UserController
