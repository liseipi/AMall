'use strict'

const querystring = use('querystring')
const Env = use('Env')
const Helpers = use('Helpers')
const Drive = use('Drive')
const {readFile, uploadMultiplePic} = use('App/Helpers/Handle')

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
  async Browse({view, request, response}) {
    const url = request.url()
    const query = request.get()
    let params = {}
    if (query) {
      params = {...query}
      if (params.path) {
        delete params.path
      }
    }
    const {type, path} = request.get()
    let rootPath = path ? path : Env.get('', 'uploads')
    const dir = await Helpers.appRoot(rootPath)
    if (!await Drive.exists(dir)) {
      return response.route('FileController.Browse')
    }

    let data = {}
    if (type) {
      data = await readFile(dir, type)
    } else {
      data = await readFile(dir)
    }

    return view.render('file.list', {...data, path: rootPath, url, params: querystring.stringify(params)})
  }

  //上传FORM
  async Upload({view, response}) {
    return view.render('file.upload')
  }

  //多图片上传
  async UploadSave({request, response}) {
    const {path} = request.get()
    const fileData = await uploadMultiplePic(request, 'thumb_img', {}, path || Env.get('UPLOAD_DIR', 'uploads'))

    //return response.redirect('back')

    const scanParams = {...request.get(), path: fileData.filePath}
    const scanUrl = querystring.unescape(querystring.stringify(scanParams))
    return response.route(`/assets/browseServer?${scanUrl}`)
  }

}

module.exports = FileController
