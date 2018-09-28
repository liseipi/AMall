'use strict'

const Env = use('Env')
const Helpers = use('Helpers')
const Drive = use('Drive')
const { readFile } = use('App/Helpers/Handle')

class FileController {

  //访问图片
  async Images({response, params}) {
    const oldPic = Helpers.appRoot('/uploads') + '/' + params[0]
    const exists = await Drive.exists(oldPic)
    if (exists) {
      return response.download(oldPic)
    }
  }

  //浏览图片集
  async Browse({view}) {
    const dir = await Helpers.appRoot('uploads')

    const src = await readFile(dir)
    console.log(src)
    return view.render('file.list', {
      src
    })
  }

  //上传图片FORM
  async Upload({view}) {

  }

  //上传图片
  async UploadSave({request, response}) {

  }

}

module.exports = FileController
