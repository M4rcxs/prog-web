//arquivo poducts_controller.ts

import Product from '#models/product'
import { HttpContext } from '@adonisjs/core/http'
export default class ProductsController {

  // Método para listar os produtos
  public async index({ response }: HttpContext) {
    const products = await Product.all()

    if (products.length === 0) {
      return response.status(200).json({ message: 'Não há nenhum produto disponível.' })
    }

    return response.status(200).json(products)
  }

  // Método para criar um novo produto
  public async create({ request, response }: HttpContext) {
    const data = request.only(['name', 'description', 'price'])

    try {
      // Cria o produto no banco de dados
      const product = await Product.create(data)

      // Retorna o produto criado
      return response.status(201).json(product)
    } catch (error) {
      // Em caso de erro, retorna uma resposta de erro
      return response.status(500).json({
        message: 'Erro ao criar produto',
        error: error.message,
      })
    }
  }
}
