'use strict'

const Env = use('Env')
const Database = use('Database')
const Helpers = use('Helpers')
const fs = use('fs')
const path = use('path')
const image = use("imageinfo")
const underscore = use('underscore')

class HandleClass {

  //结合表单与表中字段有效的数据 - filterFieldData
  static async filterFieldData(tablename, data) {
    const tableField = await Database.table(tablename).columnInfo()

    let fieldData = {...tableField}
    delete fieldData.ni_id

    let saveData = {}
    for (let key in fieldData) {
      if (data.hasOwnProperty(key)) {
        saveData[key] = data[key]
      }
    }

    return saveData
  }

  //返回无极树型结构多维数组
  static treeSort(data = [...data], pid = 0, level = 1) {
    let result = [], temp, _this = this
    data.forEach((item) => {
      if (item.parent_id == pid) {
        item = Object.assign({}, item, {level_id: level})
        result.push(item)
        temp = _this.treeSort(data, item.ni_id, level + 1)
        if (temp.length > 0) {
          item.children = temp
        }
      }
    })
    return [...result]
  }

  //返回无极树型结构一维数组
  static treeSoleSort(data, pid = 0, level = 1) {
    let originData = [].concat(data)

    //originData.sort((a, b) => a.ni_id - b.ni_id)
    underscore(originData, item => item.ni_id)

    let result = []

    function sort_tree(Pid, level) {
      originData.forEach((item, index) => {
        if (item.parent_id == Pid) {
          item = Object.assign({}, item, {level_id: level})
          result.push(item)
          sort_tree(item.ni_id, level + 1)
        }
      })
    }

    sort_tree(pid, level)
    return [...result]
  }

  //返回子集的需要字段 *(请先使用 treeSoleSort 处理返回子集一唯数据)
  static async findSubData(data = [...data], pid = 0, field = 'ni_id') {
    let result = []
    let formatData = await this.treeSoleSort([...data], pid)
    formatData.forEach((item, index) => {
      result.push(item[field])
    })
    return [...result]
  }

  //单个图片上传处理
  static async uploadPic(request, field, config = {}, path = Env.get('UPLOAD_DIR', 'uploads')) {

    const {size, width, height} = {
      size: config.size || 2,
      width: config.width || 2000,
      height: config.height || 2000
    }

    const profilePic = request.file(field, {
      types: ['image'],
      size: `${size}mb`
    })

    if (profilePic) {
      const PicName = (new Date().getTime()).toString(32) + Math.random().toString(16).substr(2)
      await profilePic.move(Helpers.appRoot(path), {
        name: `${PicName}.${profilePic.subtype}`
      })
    } else {
      return {
        clientName: '',
        fieldName: '',
        subtype: '',
        status: 'error',
        error: 'ERROR: NULL, 请检查FORM中ENCTYPER的值。'
      }
    }

    const profileInfo = {
      clientName: profilePic.clientName,
      fieldName: profilePic.fieldName,
      subtype: profilePic.subtype,
      status: profilePic.status,
      error: profilePic.error()
    }

    if (!profilePic.moved()) {
      return profileInfo
    }

    profileInfo.fileName = profilePic.fileName
    return profileInfo

  }

  //多个图片上传处理
  static async uploadMultiplePic(request, field, config = {}, path = Env.get('UPLOAD_DIR', 'uploads')) {

    const profilePics = requestFile.file(picFile, {
      types: ['image'],
      size: upSize + 'mb'
    })

    if (profilePics) {
      await profilePics.moveAll(Helpers.appRoot(path), (file) => {
        return {
          name: `${(new Date().getTime()).toString(32) + Math.random().toString(16).substr(2)}.${file.clientName.replace(/^.+\./, '')}`
        }
      })
      if (!profilePics.movedAll()) {
        profilePics._files.forEach(item => {
          if (item.status == 'error') {
            if (Drive.exists(item.tmpPath)) {
              Drive.delete(item.tmpPath)
            }
          }
        })
      }
      let proData = profilePics._files.map(item => {
        return {fileName: item.fileName, status: item.status, error: item._error}
      })
      return proData
    }

    return

  }

  static async readFile(dir, type) {

    function readFileList(path, filesList) {
      let files = fs.readdirSync(path)
      files.forEach(function (itm) {
        let stat = fs.statSync(`${path}/${itm}`)
        if (stat.isDirectory()) {
          //递归读取文件
          //readFileList(`${path}/${itm}/`, filesList)
        } else {
          filesList.push({path: path, filename: itm})
        }
      })
    }

    function readDirectoryList(path, dirList) {
      let files = fs.readdirSync(path)
      files.forEach(function (itm) {
        let stat = fs.statSync(`${path}/${itm}`)
        if (stat.isDirectory()) {
          dirList.push({path: path, filename: itm})
        }
      })
    }

    const getFiles = {
      //获取文件夹下的所有文件
      getFileList: function (path) {
        let filesList = []
        readFileList(path, filesList)
        return filesList
      },
      //获取文件夹下的所有图片
      getImageFiles: function (path) {
        let imageList = []
        this.getFileList(path).forEach((item) => {
          let ms = image(fs.readFileSync(`${item.path}/${item.filename}`))
          ms.mimeType && (imageList.push({filename: item.filename}))
        })
        return imageList
      },
      //目录
      getDirectory: function (path) {
        let dirList = []
        readDirectoryList(path, dirList)
        return dirList
      }
    }

    //获取文件夹下的所有图片
    //return getFiles.getImageFiles(dir)

    //获取文件夹下的所有文件
    //return getFiles.getFileList(dir)

    //获取文件夹
    //return getFiles.getDirectory(dir)

    if(type){
      if(type == 'image'){
        return { Directory: getFiles.getDirectory(dir), images: getFiles.getImageFiles(dir)}
      }
    }else{
      return { Directory: getFiles.getDirectory(dir), images: getFiles.getFileList(dir)}
    }

    return { Directory: getFiles.getDirectory(dir), images: getFiles.getImageFiles(dir)}

  }

}

module.exports = HandleClass
