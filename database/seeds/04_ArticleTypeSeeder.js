'use strict'

/*
|--------------------------------------------------------------------------
| ArticleTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Type = use('App/Models/Article/Type')

class ArticleTypeSeeder {
  async run() {
    const type = [
      {ni_id: 1, type_name: '普通'},
      {ni_id: 2, type_name: '最新'},
      {ni_id: 3, type_name: '推荐'},
      {ni_id: 4, type_name: '热门'}
    ]
    await Type.createMany(type)
  }
}

module.exports = ArticleTypeSeeder
