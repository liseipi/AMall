'use strict'

/*
|--------------------------------------------------------------------------
| 02_MenuSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Menu = use('App/Models/Menu')

class MenuSeeder {
  async run () {

    const menus = [
      {ni_id:100,menu_name:"控制台中心",parent_id:0,controller:"/dashboard",run_status:0,menu_sort:100},

      {ni_id:150,menu_name:"导航菜单管理",parent_id:0,controller:"/menu",run_status:0,menu_sort:100},
      {ni_id:151,menu_name:"增加菜单",parent_id:150,controller:"/menu/add",run_status:0,menu_sort:100},
      {ni_id:152,menu_name:"菜单列表",parent_id:150,controller:"/menu/list",run_status:0,menu_sort:100},
      {ni_id:153,menu_name:"编辑菜单",parent_id:150,controller:"/menu/edit",run_status:1,menu_sort:100},
      {ni_id:154,menu_name:"删除菜单",parent_id:150,controller:"/menu/destroy",run_status:1,menu_sort:100},

      {ni_id:200,menu_name:"文章管理",parent_id:0,controller:"/article",run_status:0,menu_sort:100},
      {ni_id:201,menu_name:"增加文章",parent_id:200,controller:"/article/add",run_status:0,menu_sort:100},
      {ni_id:202,menu_name:"文章列表",parent_id:200,controller:"/article/list",run_status:0,menu_sort:100},
      {ni_id:203,menu_name:"编辑文章",parent_id:200,controller:"/article/edit",run_status:1,menu_sort:100},
      {ni_id:204,menu_name:"删除文章",parent_id:200,controller:"/article/destroy",run_status:1,menu_sort:100},
      {ni_id:205,menu_name:"增加栏目",parent_id:200,controller:"/article/categoryAdd",run_status:0,menu_sort:100},
      {ni_id:206,menu_name:"栏目列表",parent_id:200,controller:"/article/category",run_status:0,menu_sort:100},
      {ni_id:207,menu_name:"编辑栏目",parent_id:200,controller:"/article/categoryEdit",run_status:1,menu_sort:100},
      {ni_id:208,menu_name:"删除栏目",parent_id:200,controller:"/article/categoryDestroy",run_status:1,menu_sort:100},
      {ni_id:209,menu_name:"增加标签",parent_id:200,controller:"/article/labelAdd",run_status:0,menu_sort:100},
      {ni_id:210,menu_name:"标签列表",parent_id:200,controller:"/article/label",run_status:0,menu_sort:100},
      {ni_id:211,menu_name:"编辑标签",parent_id:200,controller:"/article/labelEdit",run_status:1,menu_sort:100},
      {ni_id:212,menu_name:"删除标签",parent_id:200,controller:"/article/labelDestroy",run_status:1,menu_sort:100},



      {ni_id:350,menu_name:"会员管理",parent_id:0,controller:"/member",run_status:0,menu_sort:100},
      {ni_id:351,menu_name:"增加会员",parent_id:350,controller:"/member/add",run_status:0,menu_sort:100},
      {ni_id:352,menu_name:"会员列表",parent_id:350,controller:"/member/list",run_status:0,menu_sort:100},
      {ni_id:353,menu_name:"编辑会员",parent_id:350,controller:"/member/edit",run_status:1,menu_sort:100},
      {ni_id:354,menu_name:"删除会员",parent_id:350,controller:"/member/destroy",run_status:1,menu_sort:100},
      {ni_id:355,menu_name:"增加等级",parent_id:350,controller:"/member/levelAdd",run_status:0,menu_sort:100},
      {ni_id:356,menu_name:"等级列表",parent_id:350,controller:"/member/level",run_status:0,menu_sort:100},
      {ni_id:357,menu_name:"编辑等级",parent_id:350,controller:"/member/levelEdit",run_status:1,menu_sort:100},
      {ni_id:358,menu_name:"删除等级",parent_id:350,controller:"/member/levelDestroy",run_status:1,menu_sort:100},
      {ni_id:359,menu_name:"增加地址",parent_id:350,controller:"/member/addressNew",run_status:1,menu_sort:100},
      {ni_id:360,menu_name:"编辑地址",parent_id:350,controller:"/member/addressEdit",run_status:1,menu_sort:100},
      {ni_id:361,menu_name:"删除地址",parent_id:350,controller:"/member/addressDestroy",run_status:1,menu_sort:100},
      {ni_id:362,menu_name:"会员购物车",parent_id:350,controller:"/member/cart",run_status:1,menu_sort:100},
      {ni_id:363,menu_name:"保存购物车",parent_id:350,controller:"/member/cartSave",run_status:1,menu_sort:101},

      {ni_id:450,menu_name:"权限管理",parent_id:0,controller:"/manager",run_status:0,menu_sort:100},
      {ni_id:451,menu_name:"增加角色",parent_id:450,controller:"/manager/roleAdd",run_status:0,menu_sort:100},
      {ni_id:452,menu_name:"角色列表",parent_id:450,controller:"/manager/role",run_status:0,menu_sort:100},
      {ni_id:453,menu_name:"编辑角色",parent_id:450,controller:"/manager/roleEdit",run_status:1,menu_sort:100},
      {ni_id:454,menu_name:"删除角色",parent_id:450,controller:"/manager/roleDestroy",run_status:1,menu_sort:100},
      {ni_id:455,menu_name:"增加管理员",parent_id:450,controller:"/manager/userAdd",run_status:0,menu_sort:100},
      {ni_id:456,menu_name:"管理员列表",parent_id:450,controller:"/manager/user",run_status:0,menu_sort:100},
      {ni_id:457,menu_name:"编辑管理员",parent_id:450,controller:"/manager/userEdit",run_status:1,menu_sort:100},
      {ni_id:458,menu_name:"删除管理员",parent_id:450,controller:"/manager/userDestroy",run_status:1,menu_sort:100},
      {ni_id:459,menu_name:"编辑个人信息",parent_id:450,controller:"/manager/profile",run_status:1,menu_sort:100},

      {ni_id:500,menu_name:"资源管理",parent_id:0,controller:"/file",run_status:1,menu_sort:100},
      {ni_id:501,menu_name:"上传资源",parent_id:500,controller:"/file/save",run_status:0,menu_sort:100},

      {ni_id:600,menu_name:"系统管理",parent_id:0,controller:"/system",run_status:0,menu_sort:100},
      {ni_id:601,menu_name:"商店信息",parent_id:600,controller:"/system/store",run_status:0,menu_sort:100}
    ]

    await Menu.createMany(menus)

  }
}

module.exports = MenuSeeder
