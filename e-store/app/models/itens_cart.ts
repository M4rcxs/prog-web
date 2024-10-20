import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Cart from '#models/cart'
import Product from '#models/product'

export default class ItensCart extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cart_id: number

  @column()
  declare product_id: number

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Definir relacionamento com Cart
  @belongsTo(() => Cart, {
    foreignKey: 'CartId',
  })
  public cart: any

  // Definir relacionamento com Product
  @belongsTo(() => Product, {
    foreignKey: 'ProductId',
  })
  public product: any
}