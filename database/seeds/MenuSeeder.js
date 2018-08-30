'use strict'

/*
|--------------------------------------------------------------------------
| MenuSeeder
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
      {ni_id:100,menuname:"控制台中心",parent_id:0,controller:"/dashboard",run_status:0,menu_sort:100},

      {ni_id:150,menuname:"导航菜单管理",parent_id:0,controller:"/menu",run_status:0,menu_sort:100},
      {ni_id:151,menuname:"增加菜单",parent_id:150,controller:"/menu/add",run_status:0,menu_sort:100},
      {ni_id:152,menuname:"菜单列表",parent_id:150,controller:"/menu/list",run_status:0,menu_sort:100},
      {ni_id:153,menuname:"编辑菜单",parent_id:150,controller:"/menu/edit",run_status:1,menu_sort:100},
      {ni_id:154,menuname:"删除菜单",parent_id:150,controller:"/menu/destroy",run_status:1,menu_sort:100},

      {ni_id:200,menuname:"文章管理",parent_id:0,controller:"/article",run_status:0,menu_sort:100},
      {ni_id:201,menuname:"增加文章",parent_id:200,controller:"/article/add",run_status:0,menu_sort:100},
      {ni_id:202,menuname:"文章列表",parent_id:200,controller:"/article/list",run_status:0,menu_sort:100},
      {ni_id:203,menuname:"编辑文章",parent_id:200,controller:"/article/edit",run_status:1,menu_sort:100},
      {ni_id:204,menuname:"删除文章",parent_id:200,controller:"/article/destroy",run_status:1,menu_sort:100},
      {ni_id:205,menuname:"增加栏目",parent_id:200,controller:"/article/categoryAdd",run_status:0,menu_sort:100},
      {ni_id:206,menuname:"栏目列表",parent_id:200,controller:"/article/category",run_status:0,menu_sort:100},
      {ni_id:207,menuname:"编辑栏目",parent_id:200,controller:"/article/categoryEdit",run_status:1,menu_sort:100},
      {ni_id:208,menuname:"删除栏目",parent_id:200,controller:"/article/categoryDestroy",run_status:1,menu_sort:100},

      

      {ni_id:350,menuname:"会员管理",parent_id:0,controller:"/member",run_status:0,menu_sort:100},
      {ni_id:351,menuname:"增加会员",parent_id:350,controller:"/member/add",run_status:0,menu_sort:100},
      {ni_id:352,menuname:"会员列表",parent_id:350,controller:"/member/list",run_status:0,menu_sort:100},
      {ni_id:353,menuname:"编辑会员",parent_id:350,controller:"/member/edit",run_status:1,menu_sort:100},
      {ni_id:354,menuname:"删除会员",parent_id:350,controller:"/member/destroy",run_status:1,menu_sort:100},
      {ni_id:355,menuname:"增加等级",parent_id:350,controller:"/member/levelAdd",run_status:0,menu_sort:100},
      {ni_id:356,menuname:"等级列表",parent_id:350,controller:"/member/level",run_status:0,menu_sort:100},
      {ni_id:357,menuname:"编辑等级",parent_id:350,controller:"/member/levelEdit",run_status:1,menu_sort:100},
      {ni_id:358,menuname:"删除等级",parent_id:350,controller:"/member/levelDestroy",run_status:1,menu_sort:100},
      {ni_id:359,menuname:"增加地址",parent_id:350,controller:"/member/addressNew",run_status:1,menu_sort:100},
      {ni_id:360,menuname:"编辑地址",parent_id:350,controller:"/member/addressEdit",run_status:1,menu_sort:100},
      {ni_id:361,menuname:"删除地址",parent_id:350,controller:"/member/addressDestroy",run_status:1,menu_sort:100},
      {ni_id:362,menuname:"会员购物车",parent_id:350,controller:"/member/cart",run_status:1,menu_sort:100},
      {ni_id:363,menuname:"保存购物车",parent_id:350,controller:"/member/cartSave",run_status:1,menu_sort:101},

      {ni_id:450,menuname:"权限管理",parent_id:0,controller:"/manager",run_status:0,menu_sort:100},
      {ni_id:451,menuname:"角色列表",parent_id:450,controller:"/manager/role",run_status:0,menu_sort:100},
      {ni_id:452,menuname:"增加角色",parent_id:450,controller:"/manager/roleAdd",run_status:0,menu_sort:100},
      {ni_id:453,menuname:"编辑角色",parent_id:450,controller:"/manager/roleEdit",run_status:1,menu_sort:100},
      {ni_id:454,menuname:"删除角色",parent_id:450,controller:"/manager/roleDestroy",run_status:1,menu_sort:100},
      {ni_id:455,menuname:"增加管理员",parent_id:450,controller:"/manager/add",run_status:0,menu_sort:100},
      {ni_id:456,menuname:"管理员列表",parent_id:450,controller:"/manager/list",run_status:0,menu_sort:100},
      {ni_id:457,menuname:"编辑管理员",parent_id:450,controller:"/manager/edit",run_status:1,menu_sort:100},
      {ni_id:458,menuname:"删除管理员",parent_id:450,controller:"/manager/destroy",run_status:1,menu_sort:100},

      {ni_id:500,menuname:"资源管理",parent_id:0,controller:"/file",run_status:1,menu_sort:100},
      {ni_id:501,menuname:"上传资源",parent_id:500,controller:"/file/save",run_status:0,menu_sort:100},

      {ni_id:600,menuname:"系统管理",parent_id:0,controller:"/system",run_status:0,menu_sort:100},
      {ni_id:601,menuname:"商店信息",parent_id:600,controller:"/system/shopInfo",run_status:0,menu_sort:100}
    ]

    await Menu.createMany(menus)

  }
}

module.exports = MenuSeeder
