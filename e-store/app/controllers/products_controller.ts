//arquivo poducts_controller.ts

import Product from '#models/product'
import { HttpContext } from '@adonisjs/core/http'
export default class ProductsController {

  // Método para listar os produtos
  public async index({ view }: HttpContext) {
    const products = await Product.all()

    return view.render('products/products', { products })
  }

  public async show({ params, view }: HttpContext) {
    console.log('ID do produto:', params.id)  // Log para verificar o valor do ID
    const product = await Product.find(params.id)
  
    if (!product) {
      console.log('Produto não encontrado')  // Log se o produto não for encontrado
    }
  
    return view.render('products/product', { product })
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
