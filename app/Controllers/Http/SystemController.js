'use strict'

const Store = use('App/Models/Store')
const Handle = use('App/Helpers/Handle')

const {alertPrompt} = use('App/Helpers/AlertPrompt')

const storeTable = 'ni_store'

const Test = use('App/Helpers/Test')

class SystemController {

  async Store({view}) {
    const store = await Store.first()
    return view.render('system.store', {store})
  }

  async StoreSave({request, session, response}) {

    const saveData = await Handle.filterFieldData(storeTable, request.post())

    const logoPic = await Handle.uploadPic(request, 'store_logo', {size: 5})

    if (logoPic.status == 'moved') {
      saveData.store_logo = logoPic.fileName
    }

    if (logoPic.status == 'error' && logoPic.clientName!='') {
      return alertPrompt({session, response, title: 'Error', type: 'error', message: `保存失败! Error: ${logoPic.error.message}`, responseURL: 'back'})
    }

    const store = await Store.first()

    if (store) {
      try {
        store.merge(saveData)
        await store.save()
        throw Test.invoke('aaaaaa', 200)
        return //alertPrompt({session, response, title: 'OK', type: 'success', message: '保存成功!', responseURL: 'back'})
      } catch (error) {
        console.log(234)
        return alertPrompt({session, response, title: 'Error', type: 'error', message: `保存失败! Error: ${error}`, responseURL: 'back'})
      }
    } else {
      try {
        await Store.create(saveData)
        return alertPrompt({session, response, title: 'OK', type: 'success', message: '保存成功!', responseURL: 'back'})
      } catch (error) {
        return alertPrompt({session, response, title: 'Error', type: 'error', message: `保存失败! Error: ${error}`, responseURL: 'back'})
      }
    }

  }

}

module.exports = SystemController
