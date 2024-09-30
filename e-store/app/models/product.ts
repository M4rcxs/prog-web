import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Category from '#models/category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column({ columnName: 'image_url' })
  declare imageUrl: string

  @column()
  declare price: number

  @column()
  declare categoriaId: number

  @belongsTo(() => Category, {
    foreignKey: 'categoriaId',
  })
  public category: any

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null // Alterar para DateTime
}
