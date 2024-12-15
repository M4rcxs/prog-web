import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddQuantityToProducts extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('quantidade').unsigned().notNullable().defaultTo(0)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('quantidade')
    })
  }
}