import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Chave primária
      table.string('name').notNullable() // Campo 'name' do tipo string
      table.text('description').nullable() // Campo 'description' do tipo texto
      table.decimal('price', 12, 2).notNullable() 
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}