'use strict'

const Article = use('App/Models/Article/Article')

class CommentController {

  async show({view, params: {id}}) {
    const article = await Article.findOrFail(id)
    return view.render('article.comment_show', {article: toJSON(article)})
  }

}

module.exports = CommentController
