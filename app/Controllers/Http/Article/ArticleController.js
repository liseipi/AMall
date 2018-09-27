'use strict'

const Article = use('App/Models/Article/Article')
const Category = use('App/Models/Article/Category')
const Label = use('App/Models/Article/Label')
const Type = use('App/Models/Article/Type')
const Source = use('App/Models/Article/Source')
const User = use('App/Models/User')

const Env = use('Env')
const Helpers = use('Helpers')
const Drive = use('Drive')
const lodash = use('lodash')
const Handle = use('App/Helpers/Handle')
const {alertPrompt} = use('App/Helpers/AlertPrompt')

const articleTable = 'ni_article'

class ArticleController {

  async List({view, request}) {
    const query = request.get()
    const page = query.page || 1
    const perPage = 20
    const category_id = query.category_id || 0
    const keywords = query.keywords || ''

    const articleItem = await Article
      .query()
      .where((builder) => {
        if (keywords) {
          builder.where('title', 'like', `%${keywords}%`)
        }
        if (category_id > 0) {
          builder.where('category_id', category_id)
        }
        return builder
      })
      .with('types', builder => {
        builder.select('type_name')
      })
      .with('labels', builder => {
        builder.select('label_name')
      })
      .with('category', builder => {
        builder.select('ni_id', 'column_name')
      })
      //.orderBy('sort', 'desc')
      .orderByRaw('case when sort is null then 0 else 1 end, sort desc, ni_id desc')
      .paginate(page, perPage)

    const categoryItem = await Category.query().fetch()
    const formatData = await Handle.treeSoleSort(categoryItem.toJSON())

    return view.render('article.list', {
      categoryItem: formatData,
      articleItem: articleItem.toJSON(),
      query
    })
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

    if (!saveData.sort) {
      saveData.sort = null
    }

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

  async Edit({view, params: {id}, auth}) {
    const articleInfo = await Article.findOrFail(id)
    await articleInfo.loadMany({
      types: builder => builder.select('ni_id'),
      labels: builder => builder.select('ni_id')
    })
    const articleTypes = lodash._.map(articleInfo.toJSON().types, 'ni_id')
    const articleLabels = lodash._.map(articleInfo.toJSON().labels, 'ni_id')

    const categoryItem = await Category.query().fetch()
    const formatData = await Handle.treeSoleSort(categoryItem.toJSON())

    const LabelItem = await Label.query().fetch()
    const SourceItem = await Source.query().fetch()
    const TypeItem = await Type.query().fetch()

    //判断为 admin 角色时显示有权限修改文章作者
    const isAdmin = await auth.user.is(['admin'])
    const UserItem = await User.query().select('ni_id', 'username').where(builder => {
      if (!isAdmin) {
        builder.whereIn('ni_id', [auth.user.ni_id, articleInfo.toJSON().author])
      }
    }).fetch()

    return view.render('article.edit', {
      categoryItem: formatData,
      LabelItem: LabelItem.toJSON(),
      SourceItem: SourceItem.toJSON(),
      TypeItem: TypeItem.toJSON(),
      UserItem: UserItem.toJSON(),
      articleInfo: articleInfo.toJSON(),
      articleTypes,
      articleLabels,
      isAdmin
    })
  }

  async EditSave({request, response, session, auth, params: {id}}) {
    const isAdmin = await auth.user.is(['admin'])
    let body = {}
    if (isAdmin) {
      body = request.all()
    } else {
      body = request.except(['username', 'email'])
    }
    const saveData = await Handle.filterFieldData(articleTable, body)

    const {type_id} = request.only(['type_id'])
    const {label_id} = request.only(['label_id'])

    if (!saveData.sort) {
      saveData.sort = null
    }

    const thumbImg = await Handle.uploadPic(request, 'thumb_img')
    if (thumbImg.status == 'moved') {
      saveData.thumb_img = thumbImg.fileName
    }

    try {
      const article = await Article.findOrFail(id)
      article.merge(saveData)
      await article.save()

      if (type_id) {
        await article.types().sync(type_id || [])
      } else {
        await article.types().detach()
      }

      if (label_id) {
        await article.labels().sync(label_id || [])
      } else {
        await article.labels().detach()
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
        message: '编辑成功!',
        responseURL: '/article/list'
      })
    } catch (error) {
      alertPrompt({
        session,
        response,
        title: 'Error',
        type: 'error',
        message: `编辑失败! ${error}`,
        responseURL: 'back'
      })
    }

  }

  async Destroy({request, response, session, params: {id}}) {
    try {
      const article = await Article.findOrFail(id)
      await article.types().detach()
      await article.labels().detach()

      if (article.toJSON().thumb_img) {
        const filePath = Helpers.appRoot(Env.get('UPLOAD_DIR', 'uploads') + article.toJSON().thumb_img)
        const exists = await Drive.exists(filePath)
        if (exists) {
          await Drive.delete(filePath)
        }
      }

      await article.delete()

      alertPrompt({
        session,
        response,
        title: 'OK',
        type: 'success',
        message: '删除成功!',
        responseURL: 'back'
      })
    } catch (error) {
      alertPrompt({
        session,
        response,
        title: 'Error',
        type: 'error',
        message: `删除失败! ${error}`,
        responseURL: 'back'
      })
    }
  }

  async Sort({request, response, session, params: {id}}) {
    const {type} = request.get()
    const article = await Article.findOrFail(id)

    const {sort} = await Article
      .query()
      .select('sort')
      .where('sort', function () {
        this.max('sort')
      })
      .first()

    const saveData = {}
    if (type == 'top') {
      saveData.sort = null
    }
    if (type == 'plus') {
      saveData.sort = article.toJSON().sort ? article.toJSON().sort + 1 : null
    }
    if (type == 'less') {
      saveData.sort = article.toJSON().sort ? article.toJSON().sort - 1 == 100 ? 101 : article.toJSON().sort - 1 : sort + 1
    }

    try {
      article.merge(saveData)
      await article.save()

      // alertPrompt({
      //   session,
      //   response,
      //   title: 'OK',
      //   type: 'success',
      //   message: '排序完成!',
      //   responseURL: 'back'
      // })

      return response.redirect('back')

    } catch (error) {
      alertPrompt({
        session,
        response,
        title: 'Error',
        type: 'error',
        message: `排序失败! ${error}`,
        responseURL: 'back'
      })
    }

  }

}

module.exports = ArticleController
