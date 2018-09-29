'use strict'

const querystring = use('querystring')
const Env = use('Env')
const Helpers = use('Helpers')
const Drive = use('Drive')
const {readFile} = use('App/Helpers/Handle')

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
  async Browse({view, request}) {
    const url = request.url()
    const query = request.get()
    let params = {}
    if (query) {
      params = {...query}
      if(params.path){
        delete params.path
      }
    }
    const {type, path} = request.get()
    let rootPath = ''
    if(path){
      rootPath = path
    }else{
      rootPath = Env.get('', 'uploads')
    }
    const dir = await Helpers.appRoot(rootPath)

    let data = {}
    if (type) {
      data = await readFile(dir, type)
    } else {
      data = await readFile(dir)
    }

    return view.render('file.list', {...data, path: rootPath, url, params: '?'+querystring.stringify(params)})
  }

  //上传FORM
  async Upload({view}) {
    return view.render('file.upload')
  }

  //上传图片
  async UploadSave({request, response}) {

  }

}

module.exports = FileController
