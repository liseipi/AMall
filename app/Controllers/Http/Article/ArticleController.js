'use strict'

const Article = use('App/Models/Article/Article')
const Category = use('App/Models/Article/Category')
const Label = use('App/Models/Article/Label')
const Type = use('App/Models/Article/Type')
const Source = use('App/Models/Article/Source')
const User = use('App/Models/User')

const Handle = use('App/Helpers/Handle')
const {alertPrompt} = use('App/Helpers/AlertPrompt')

const articleTable = 'ni_article'

class ArticleController {

  async List({view}) {
    const articleItem = await Article
      .query()
      .with('types', builder => {
        builder.select('type_name')
      })
      .with('labels', builder => {
        builder.select('label_name')
      })
      .with('category', builder => {
        builder.select('ni_id', 'column_name')
      })
      //.fetch()
      .paginate(1)

    return view.render('article.list', {articleItem: articleItem.toJSON()})
  }

  async Add({view, auth}) {
    const categoryItem = await Category.query().fetch()
    const formatData = await Handle.treeSoleSort(categoryItem.toJSON())

    const maxSort = await Article
      .query()
      .select('sort')
      .where('sort', function () {
        this.max('sort')
      })
      .first()

    const LabelItem = await Label.query().fetch()
    const SourceItem = await Source.query().fetch()
    const TypeItem = await Type.query().fetch()
    const UserItem = await User.query().select('ni_id', 'username').fetch()

    const user_id = await auth.user.ni_id

    return view.render('article.add', {
      categoryItem: formatData,
      LabelItem: LabelItem.toJSON(),
      SourceItem: SourceItem.toJSON(),
      TypeItem: TypeItem.toJSON(),
      UserItem: UserItem.toJSON(),
      maxSort: maxSort ? maxSort.toJSON() : {sort: 100},
      user_id
    })
  }

  async AddSave({request, response, session}) {

    const saveData = await Handle.filterFieldData(articleTable, request.post())
    const {type_id, label_id} = request.only(['type_id', 'label_id'])

    const thumbImg = await Handle.uploadPic(request, 'thumb_img')
    if (thumbImg.status == 'moved') {
      saveData.thumb_img = thumbImg.fileName
    }

    try {
      const article = await Article.create(saveData)

      if (type_id) {
        await article.types().attach(type_id)
      }
      if (label_id) {
        await article.labels().attach(label_id)
      }

      if (thumbImg.status == 'error' && thumbImg.clientName != '') {
        return alertPrompt({
          session,
          response,
          title: 'Error',
          type: 'error',
          message: `文章保存成功，图片上传失败! ${thumbImg.error.message}`,
          responseURL: 'back'
        })
      }

      alertPrompt({
        session,
        response,
        title: 'OK',
        type: 'success',
        message: '创建成功!',
        responseURL: '/article/list'
      })
    } catch (error) {
      alertPrompt({
        session,
        response,
        title: 'Error',
        type: 'error',
        message: `创建失败! ${error}`,
        responseURL: 'back'
      })
    }
  }

}

module.exports = ArticleController
