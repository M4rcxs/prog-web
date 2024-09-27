import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class HomeController {
  public async index({ view }: HttpContext) {
    const products = await Product.all()
    return view.render('home', { products })
  }
}
