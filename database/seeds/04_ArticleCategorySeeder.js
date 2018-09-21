'use strict'

/*
|--------------------------------------------------------------------------
| 04_ArticleCategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const ArticleCategory = use('App/Models/Article/Category')

class ArticleCategorySeeder {
  async run () {
    const category = [
      {column_name: '行业动态', parent_id: 0},
      {column_name: '企业新闻', parent_id: 0}
    ]
    await ArticleCategory.createMany(category)
  }
}

module.exports = ArticleCategorySeeder
