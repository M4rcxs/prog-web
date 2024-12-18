import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'

export default class AddressShipping extends BaseModel {
  public static table = 'address_shipping'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare full_name: string

  @column()
  declare phone: string

  @column()
  declare cep: string

  @column()
  declare state_city: string

  @column()
  declare neighborhood: string

  @column()
  declare street: string

  @column()
  declare number: string

  @column()
  declare complement?: string

  @column()
  declare save_as?: string

  @column()
  declare user_id: number

@belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: any

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
