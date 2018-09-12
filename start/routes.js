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
    Route.get('/login', 'AuthController.login')
    Route.post('/login', 'AuthController.InLogin').validator('Login')
}).middleware(['authed'])

//退出
Route.get('/logout', 'AuthController.Logout')

Route.group(() => {

  Route.get('/', 'HomeController.Index')

  Route.get('/dashboard', 'HomeController.Dashboard')

  //菜单管理
  Route.get('/menu/list', 'MenuController.List')
  Route.get('/menu/add', 'MenuController.Add')
  Route.post('/menu/add', 'MenuController.AddSave').validator('menu')
  Route.get('/menu/edit/:id', 'MenuController.Edit')
  Route.post('/menu/edit/:id', 'MenuController.EditSave').validator('menu')
  Route.delete('/menu/destroy/:id', 'MenuController.Destroy')

  //文章管理
  //--栏目
  Route.get('/article/category', 'ArticleCategoryController.List')

  //管理员栏目
  //--角色
  Route.get('/manager/role', 'RoleController.List')
  Route.get('/manager/roleAdd', 'RoleController.Add')
  Route.post('/manager/roleAdd', 'RoleController.AddSave').validator('role')
  Route.get('/manager/roleEdit/:id', 'RoleController.Edit')
  Route.post('/manager/roleEdit/:id', 'RoleController.EditSave').validator('role')
  Route.delete('/manager/roleDestroy/:id', 'RoleController.Destroy')
  //--用户
  Route.get('/manager/user', 'UserController.List')
  Route.get('/manager/userAdd', 'UserController.Add')
  Route.post('/manager/userAdd', 'UserController.AddSave').validator('user')
  Route.get('/manager/userEdit/:id', 'UserController.Edit')
  Route.post('/manager/userEdit/:id', 'UserController.EditSave').validator('userEdit')
  Route.delete('/manager/userDestroy/:id', 'UserController.Destroy')


}).middleware(['auth'])


