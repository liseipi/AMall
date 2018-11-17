'use strict'

const Comment = use('App/Models/Article/Comment')
const Reply = use('App/Models/Article/Reply')

class BanController {

  async comment({request, response, params: {id}}) {
    const {type} = request.get()
    if (type) {
      switch (type) {
        case "comment":
          const comment = await Comment.findOrFail(id)
          comment.merge({current_comment_state: !comment.toJSON().current_comment_state})
          await comment.save()
          response.redirect('back')
          break
        case "reply":
          const reply = await Reply.findOrFail(id)
          reply.merge({current_comment_state: !reply.toJSON().current_comment_state})
          await reply.save()
          response.redirect('back')
          break
        default:
          response.redirect('back')
      }
    } else {
      console.log(123)
    }
  }

}

module.exports = BanController
