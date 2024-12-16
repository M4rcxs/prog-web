import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'itens_carts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Primary key
      table.integer('cart_id').unsigned().references('id').inTable('carts').onDelete('CASCADE') // Foreign key para cart
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE') // Foreign key para product
      table.integer('quantity').notNullable() 
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

