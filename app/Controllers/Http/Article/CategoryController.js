'use strict'

const ArticleCategory = use('App/Models/Article/Category')

class CategoryController {

  async List({view}) {
    const categoryItem = await ArticleCategory.query().fetch()
    return view.render('Article.category_list', {categoryItem: categoryItem.toJSON()})
  }

}

module.exports = CategoryController
