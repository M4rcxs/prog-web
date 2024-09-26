import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon' // Importe o tipo DateTime de luxon

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime // Alterar para DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null // Alterar para DateTime
}
