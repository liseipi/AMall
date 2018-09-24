'use strict'

const ArticleCategory = use('App/Models/Article/Category')
const Handle = use('App/Helpers/Handle')
const {alertPrompt} = use('App/Helpers/AlertPrompt')

const categoryTabel = 'ni_article_category'

class CategoryController {

  async List({view}) {
    const categoryItem = await ArticleCategory.query().fetch()
    const formatData = await Handle.treeSoleSort(categoryItem.toJSON())
    return view.render('Article.category_list', {categoryItem: formatData})
  }

  async Add({view}) {
    const categoryItem = await ArticleCategory.query().fetch()
    const formatData = await Handle.treeSoleSort(categoryItem.toJSON())

    const maxSort = await ArticleCategory
      .query()
      .select('column_sort')
      .where('column_sort', function () {
        this.max('column_sort')
      })
      .first()

    return view.render('article.category_add', {
      categoryData: formatData,
      maxSort: maxSort ? maxSort.toJSON() : {column_sort: 100}
    })
  }

  async AddSave({request, response, session}) {
    const saveData = await Handle.filterFieldData(categoryTabel, request.post())

    try {
      await ArticleCategory.create(saveData)
      alertPrompt({
        session,
        response,
        title: 'OK',
        type: 'success',
        message: '创建成功!',
        responseURL: '/article/category'
      })
    } catch (error) {
      alertPrompt({
        session,
        response,
        title: 'Error',
        type: 'error',
        message: `创建失败! Error: ${error}`,
        responseURL: 'back'
      })
    }
  }

  async Edit({view, params: {id}}) {
    const categoryInfo = await ArticleCategory.findOrFail(id)

    const categoryItem = await ArticleCategory.query().fetch()
    const formatData = await Handle.treeSoleSort(categoryItem.toJSON())

    return view.render('article.category_edit', {
      categoryData: formatData,
      categoryInfo: categoryInfo.toJSON()
    })
  }

  async EditSave({request, response, params: {id}, session}) {
    const saveData = await Handle.filterFieldData(categoryTabel, request.post())

    try {
      let category = await ArticleCategory.findOrFail(id)
      category.merge(saveData)
      await category.save()
      alertPrompt({session, response, title: 'OK', type: 'success', message: '修改成功!', responseURL: '/article/category'})
    } catch (error) {
      alertPrompt({
        session,
        response,
        title: 'Error',
        type: 'error',
        message: `修改失败! Error: ${error}`,
        responseURL: 'back'
      })
    }
  }

  async Destroy({request, response, params: {id}, session}) {
    try {
      const category = await ArticleCategory.findOrFail(id)
      category.delete()
      alertPrompt({session, response, title: 'OK', type: 'success', message: '删除成功!', responseURL: '/article/category'})
    } catch (error) {
      alertPrompt({
        session,
        response,
        title: 'Error',
        type: 'error',
        message: `删除失败! Error: ${error}`,
        responseURL: 'back'
      })
    }
  }

}

module.exports = CategoryController
