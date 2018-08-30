'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

//登陆
Route.group(() => {
    Route.get('/login', 'AuthController.login').as('login')
    Route.post('/login', 'AuthController.InLogin').validator('Login')
}).middleware(['authed'])
//退出
Route.get('/logout', 'AuthController.Logout').as('logout')

Route.group(() => {

    Route.get('/', 'HomeController.Index')

    Route.get('/dashboard', 'HomeController.Dashboard').as('dashboard')

    //Route.resource('users', 'UserController')

}).middleware(['auth'])


