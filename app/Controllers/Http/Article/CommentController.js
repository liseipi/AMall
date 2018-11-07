'use strict'

const Article = use('App/Models/Article/Article')
const Comment = use('App/Models/Article/Comment')

class CommentController {

  async show({view, params: {id}, request}) {
    const query = request.get()
    const page = query.page || 1
    const perPage = 20

    const article = await Article
      .query()
      .select('ni_id', 'title', 'user_id', 'created_at')
      .with('user', builder => {
        builder.select('ni_id', 'username')
      })
      .firstOrFail(id)

    // const articleUser = await article
    //   .user()
    //   .select('username')
    //   .fetch()

    const comment = await Comment
      .query()
      .where('article_id', id)
      .where('parent_comment_id', 0)
      .with('member', builder => {
        builder.select('ni_id', 'username')
          .with('profile', builder => {
            builder.select('member_id', 'avatar')
          })
      })
      .paginate(page, perPage)

    return view.render('article.comment_show', {
      article: article.toJSON(),
      comment: comment.toJSON(),
      query
    })
  }

}

module.exports = CommentController
