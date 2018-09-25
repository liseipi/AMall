'use strict'

/*
|--------------------------------------------------------------------------
| ArticleSourceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Source = use('App/Models/Article/Source')

class ArticleSourceSeeder {
  async run() {
    const source = [
      {ni_id: 1, source_name: '站内原创'},
      {ni_id: 2, source_name: '改编'},
      {ni_id: 3, source_name: '采集'},
      {ni_id: 4, source_name: '爬虫'}
    ]
    await Source.createMany(source)
  }
}

module.exports = ArticleSourceSeeder
