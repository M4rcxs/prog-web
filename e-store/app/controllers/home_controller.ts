import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import I18n from '@adonisjs/i18n'

export default class HomeController {
  public async index({ view }: HttpContext) {
    const products = await Product.all()
    return view.render('home', { products })
  }

  public async indexAuth({ view }: HttpContext) {
    const products = await Product.all()
    return view.render('home', { products })
  }

  public async locale({ session, response, params }: HttpContext) {

    if (i18nManager.supportedLocales().includes(params.locale)) {
      session.put('locale', params.locale)
    }

    response.redirect().back()
  }
}
