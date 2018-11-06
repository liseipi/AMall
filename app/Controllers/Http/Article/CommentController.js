'use strict'

const Article = use('App/Models/Article/Article')
const Comment = use('App/Models/Article/Comment')
const User = use('App/Models/User')
const Member = use('App/Models/Member/Member')

class CommentController {

  async show({view, params: {id}, request}) {
    const query = request.get()
    const page = query.page || 1
    const perPage = 20

    // const article = await Article.query().select('ni_id', 'title', 'author', 'created_at').firstOrFail(id)
    // const articleData = article.toJSON()
    // const user = await User.query().select('ni_id', 'username').firstOrFail(articleData.author)
    // const commentData = await Comment
    //   .query()
    //   .where('article_id', articleData.ni_id)
    //   .paginate()

    const article = await Article
      .query()
      .select('ni_id', 'title', 'author', 'created_at')
      .firstOrFail(id)

    const userArticle = await article.user().fetch()

    console.log(article.toJSON())
    console.log(userArticle)

    return view.render('article.comment_show', {
      //article: article.toJSON(),
      //user: user.toJSON(),
      //commentData: commentData.toJSON(),
      query
    })
  }

}

module.exports = CommentController
