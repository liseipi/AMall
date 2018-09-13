'use strict'

const Store = use('App/Models/Store')
const Handle = use('App/Helpers/Handle')

const {alertPrompt} = use('App/Helpers/AlertPrompt')

const storeTable = 'ni_store'

class SystemController {

  async Store({view}) {
    const store = await Store.first()
    return view.render('system.store', {store})
  }

  async StoreSave({request, session, response}) {
    const saveData = await Handle.filterFieldData(storeTable, request.post())

    const store = await Store.first()

    if (store) {
      try {
        store.merge(saveData)
        await store.save()
        alertPrompt({session, response, title: 'OK', type: 'success', message: '保存成功!', responseURL: 'back'})
      } catch (error) {
        alertPrompt({session, response, title: 'Error', type: 'error', message: `保存失败! Error: ${error}`, responseURL: 'back'})
      }
    } else {
      try {
        await Store.create(saveData)
        alertPrompt({session, response, title: 'OK', type: 'success', message: '保存成功!', responseURL: 'back'})
      } catch (error) {
        alertPrompt({session, response, title: 'Error', type: 'error', message: `保存失败! Error: ${error}`, responseURL: 'back'})
      }
    }

  }

}

module.exports = SystemController
