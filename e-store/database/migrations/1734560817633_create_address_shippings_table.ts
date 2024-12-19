import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddressShipping extends BaseSchema {
  protected tableName = 'address_shipping'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // chave primária
      table.string('full_name').notNullable()
      table.string('phone').notNullable()
      table.string('cep').notNullable()
      table.string('state_city').notNullable()
      table.string('neighborhood').notNullable()
      table.string('street').notNullable()
      table.string('number').notNullable()
      table.string('complement')
      table.string('save_as')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users') // Foreign Key para User
        .onDelete('CASCADE') // Se o usuário for deletado, exclui os endereços

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}