'use strict'

const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('ni_store', (table) => {
      table.increments('ni_id')
      table.string('store_name')
      table.string('store_title')
      table.string('store_keyword')
      table.string('store_description')
      table.string('store_tel')
      table.string('store_icp')
      table.string('store_logo')
      table.timestamps()
    })
  }

  down () {
    this.drop('ni_store')
  }
}

module.exports = StoreSchema
