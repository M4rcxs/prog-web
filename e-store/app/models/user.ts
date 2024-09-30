import { DateTime } from 'luxon'
import { Hash } from '@adonisjs/hash';
import { Argon } from '@adonisjs/hash';
import { BaseModel, column, beforeSave } from '@adonisjs/lucid/orm'

const hash = new Hash(new Argon({ }));

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare full_name: string;

  @column()
  declare email: string;

  @column()
  declare password: string;

  @column()
  declare remember_me_token?: string;
  
  @column()
  declare phone: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password);
    }
  }
}