'use strict'

const {hooks} = use('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  
  const Exception = use('Exception')
  const View = use('View')
  const Env = use('Env')
  
  //认证用户登录状态
  Exception.handle('InvalidSessionException', (error, {response}) => {
    return response.redirect('/login')
    //return response.route('login')
  })
  
  //在视图文件里返回 appUrl 地址 
  View.global('appUrl', path => {
    const APP_URL = Env.get('APP_URL')
    if (path) {
      path = path.startsWith('/') ? path : `/${path}`
    }
    return path ? `${APP_URL}${path}` : APP_URL
  })


})
