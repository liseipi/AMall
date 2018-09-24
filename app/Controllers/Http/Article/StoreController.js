'use strict'

const Category = use('App/Models/Article/Category')
const Label = use('App/Models/Article/Label')

const Handle = use('App/Helpers/Handle')

class StoreController {

  async List({view}) {
    return 'sasdf'
  }

  async Add({view}) {
    const categoryItem = await Category.query().fetch()
    const formatData = await Handle.treeSoleSort(categoryItem.toJSON())

    const LabelItem = await Label.query().fetch()

    return view.render('article.add', {categoryItem: formatData, LabelItem: LabelItem.toJSON()})
  }

  async AddSave({request}) {
    console.log(request.all())
  }

}

module.exports = StoreController
