'use strict'

const ArticleCategory = use('App/Models/Article/Category')
const Handle = use('App/Helpers/Handle')

class CategoryController {

  async List({view}) {
    const categoryItem = await ArticleCategory.query().fetch()
    const formatData = await Handle.treeSoleSort(categoryItem.toJSON())
    console.log(formatData)
    return view.render('Article.category_list', {categoryItem: formatData})
  }

}

module.exports = CategoryController
