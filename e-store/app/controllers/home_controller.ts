import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  public async index({ response }: HttpContext) {
    return response.redirect().toRoute('products.index')
  }
}
