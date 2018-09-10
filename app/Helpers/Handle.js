'use strict'

const Database = use('Database')
const Helpers = use('Helpers')
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
  static async uploadPic(requestFile, picFile, {width = 450, height = 450, upSize = 2}, path = "uploads") {

    const profilePic = requestFile.file(picFile, {
      types: ['image'],
      size: upSize + 'mb'
    })

    if (profilePic) {
      if (profilePic && profilePic.clientName) {
        await profilePic.move(Helpers.appRoot(path), {
          name: `${(new Date().getTime()).toString(32) + Math.random().toString(16).substr(2)}.${profilePic.clientName.replace(/^.+\./, '')}`
        })
        if (!profilePic.moved()) {
          //session.flash({notification: '图片上传失败！Error:'+ profilePic.error().message})
          return {fileName: '', status: 'error', error: profilePic.error()}
        }

        //let picPath = Helpers.appRoot('uploads/'+profilePic.fileName)
        //const transformer = sharp(picPath).rotate().resize(200, 200)

        return {fileName: profilePic.fileName, status: 'moved', error: {}}
      }
    }

    return
  }

  //多个图片上传处理
  static async uploadMultiplePic(requestFile, picFile, {width = 450, height = 450, upSize = 2}, path = "uploads") {

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

}

module.exports = HandleClass
