import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('categoria_id')
        .unsigned()
        .references('id')
        .inTable('categories')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Remove a coluna `categoria_id` na operação de rollback
      table.dropColumn('categoria_id')
    })
  }
}

