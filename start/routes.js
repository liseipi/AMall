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

  //首页
  Route.get('/', 'HomeController.Index')

  //控制台
  Route.get('/dashboard', 'HomeController.Dashboard')

  //File
  Route.get('/assets/images/(.*/?)', 'FileController.Images')
  Route.get('/assets/browseServer', 'FileController.Browse')
  Route.post('/assets/uploadImage', 'FileController.UploadSave')

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
  //--文章内容
  Route.get('/article/list', 'Article/ArticleController.List')
  Route.get('/article/add', 'Article/ArticleController.Add')
  Route.post('/article/add', 'Article/ArticleController.AddSave').validator('article')
  Route.get('/article/edit/:id', 'Article/ArticleController.Edit')
  Route.post('/article/edit/:id', 'Article/ArticleController.EditSave').validator('article')
  Route.delete('/article/destroy/:id', 'Article/ArticleController.Destroy')
  Route.put('/article/sort/:id', 'Article/ArticleController.Sort')
  //评论
  Route.get('/article/comment/:id', 'Article/CommentController.show')

  //管理员栏目
  //--角色
  Route.get('/manager/role', 'RoleController.List')
  Route.get('/manager/roleAdd', 'RoleController.Add')
  Route.post('/manager/roleAdd', 'RoleController.AddSave').validator('role')
  Route.get('/manager/roleEdit/:id', 'RoleController.Edit')
  Route.post('/manager/roleEdit/:id', 'RoleController.EditSave').validator('role')
  Route.delete('/manager/roleDestroy/:id', 'RoleController.Destroy')
  //--管理员用户
  Route.get('/manager/user', 'UserController.List')
  Route.get('/manager/userAdd', 'UserController.Add')
  Route.post('/manager/userAdd', 'UserController.AddSave').validator('user')
  Route.get('/manager/userEdit/:id', 'UserController.Edit')
  Route.post('/manager/userEdit/:id', 'UserController.EditSave').validator('userEdit')
  Route.delete('/manager/userDestroy/:id', 'UserController.Destroy')
  //编辑管理员个人资料
  Route.get('/manager/profile', 'UserController.Profile')
  Route.post('/manager/profile', 'UserController.ProfileSave').validator('profile')

  //会员用户栏目
  Route.get('/member/list', 'Member/MemberController.list')
  Route.get('/member/add', 'Member/MemberController.add')
  Route.post('/member/add', 'Member/MemberController.addSave').validator('member')
  Route.get('/member/edit/:id', 'Member/MemberController.edit')
  Route.post('/member/edit/:id', 'Member/MemberController.editSave')
  Route.get('/member/destroy/:id', 'Member/MemberController.destroy')
  Route.get('/member/addressNew/:id', 'MemberController.addressNew')
  Route.post('/member/addressNew/:id', 'MemberController.addressNewSave').validator('address')
  Route.get('/member/addressEdit/:id', 'MemberController.addressEdit')
  Route.post('/member/addressEdit/:id', 'MemberController.addressEditSave').validator('address')
  Route.get('/member/addressDestroy/:id', 'MemberController.addressDestroy')
  Route.get('/member/getRegion', 'MemberController.getRegion')
  Route.get('/member/cart/:id', 'MemberController.cart')
  Route.post('/member/cartSave/:id', 'MemberController.cartSave')
  Route.get('/member/level', 'Member/LevelController.list')
  Route.get('/member/levelAdd', 'Member/LevelController.add')
  Route.post('/member/levelAdd', 'Member/LevelController.addSave').validator('member_level')
  Route.get('/member/levelEdit/:id', 'Member/LevelController.edit')
  Route.post('/member/levelEdit/:id', 'Member/LevelController.editSave').validator('member_level')
  Route.get('/member/levelDestroy/:id', 'Member/LevelController.destroy')

  //系统管理
  Route.get('/system/store', 'SystemController.Store')
  Route.post('/system/store', 'SystemController.StoreSave').validator('store')


}).middleware(['auth'])


