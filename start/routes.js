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

  //File
  Route.get('/assets/images/(.*/?)', 'FileController.Images')

  //菜单管理
  Route.get('/menu/list', 'MenuController.List')
  Route.get('/menu/add', 'MenuController.Add')
  Route.post('/menu/add', 'MenuController.AddSave').validator('menu')
  Route.get('/menu/edit/:id', 'MenuController.Edit')
  Route.post('/menu/edit/:id', 'MenuController.EditSave').validator('menu')
  Route.delete('/menu/destroy/:id', 'MenuController.Destroy')

  //文章管理
  //--栏目
  Route.get('/article/category', 'Article/CategoryController.List')
  Route.get('/article/categoryAdd', 'Article/CategoryController.Add')
  Route.post('/article/categoryAdd', 'Article/CategoryController.AddSave').validator('article_category')
  Route.get('/article/categoryEdit/:id', 'Article/CategoryController.Edit')
  Route.post('/article/categoryEdit/:id', 'Article/CategoryController.EditSave').validator('article_category')
  Route.delete('/article/categoryDestroy/:id', 'Article/CategoryController.Destroy')
  //--标签
  Route.get('/article/label', 'Article/LabelController.List')
  Route.get('/article/labelAdd', 'Article/LabelController.Add')
  Route.post('/article/labelAdd', 'Article/LabelController.AddSave').validator('article_label')
  Route.get('/article/labelEdit/:id', 'Article/LabelController.Edit')
  Route.post('/article/labelEdit/:id', 'Article/LabelController.EditSave').validator('article_label')
  Route.delete('/article/labelDestroy/:id', 'Article/LabelController.Destroy')
  //--文章
  Route.get('/article/list', 'Article/StoreController.List')
  Route.get('/article/add', 'Article/StoreController.Add')
  Route.post('/article/add', 'Article/StoreController.AddSave')

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
  //编辑个人资料
  Route.get('/manager/profile', 'UserController.Profile')
  Route.post('/manager/profile', 'UserController.ProfileSave').validator('profile')

  //系统管理
  Route.get('/system/store', 'SystemController.Store')
  Route.post('/system/store', 'SystemController.StoreSave').validator('store')


}).middleware(['auth'])


