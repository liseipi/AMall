'use strict'

class Is {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.getRoles = this.getRoles
    Model.prototype.is = this.is
  }

  async getRoles(){
    const roles = await this.roles().fetch()
    const Roles = roles.toJSON().map( role => role.role_name)
    return Roles
  }

  async is(roles, all = false){
    const userRoles = await this.getRoles()
    if(Array.isArray(roles)){
      const result = roles.map( role => {
        return userRoles.includes(role)
      })
      return all ? !result.includes(false) : result.includes(true)
    }
    return userRoles.includes(roles)
  }

}

module.exports = Is
