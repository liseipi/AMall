'use strict'

const ArticleLabel = use('App/Models/Article/Label')
const Handle = use('App/Helpers/Handle')
const {alertPrompt} = use('App/Helpers/AlertPrompt')

const labelTabel = 'ni_article_label'

class LabelController {

  async List({view}) {
    const labelItem = await ArticleLabel.query().fetch()
    return view.render('article.label_list', {labelItem: labelItem.toJSON()})
  }

  async Add({view}) {
    return view.render('article.label_add')
  }

  async AddSave({request, response, session}) {
    const saveData = await Handle.filterFieldData(labelTabel, request.post())

    try {
      await ArticleLabel.create(saveData)
      alertPrompt({
        session,
        response,
        title: 'OK',
        type: 'success',
        message: '创建成功!',
        responseURL: '/article/label'
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
    const labelInfo = await ArticleLabel.findOrFail(id)

    return view.render('article.label_edit', {labelInfo})
  }

  async EditSave({request, response, params: {id}, session}) {
    const saveData = await Handle.filterFieldData(labelTabel, request.post())

    try {
      let label = await ArticleLabel.findOrFail(id)
      label.merge(saveData)
      await label.save()
      alertPrompt({session, response, title: 'OK', type: 'success', message: '修改成功!', responseURL: '/article/label'})
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
      const label = await ArticleLabel.findOrFail(id)
      label.delete()
      alertPrompt({session, response, title: 'OK', type: 'success', message: '删除成功!', responseURL: '/article/label'})
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

module.exports = LabelController
