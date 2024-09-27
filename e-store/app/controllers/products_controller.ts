//arquivo poducts_controller.ts

import Product from '#models/product'
import { HttpContext } from '@adonisjs/core/http'
import ProductService from '#services/ProductService'
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
  
  public async calculateShipping({ request, response }: HttpContext) {
    const cep = request.input('cep') // Recebe o CEP enviado pelo frontend
    console.log('CEP:', cep)  // Log para verificar o valor do CEP
    try {
      const endereco = await ProductService.getCep(cep) // Chama o serviço para buscar o CEP
      return response.json({
        success: true,
        endereco,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erro ao buscar o endereço.',
      })
    }
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'description', 'price', 'imageUrl'])	
    console.log('Dados do produto:', data)  // Log para verificar os dados do produto
    try {
      const product = await Product.create(data)

      return response.status(201).json(product)
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao criar produto',
        error: error.message,
      })
    }
  }

  
  // Método para criar um novo produto
  public async create({ view }: HttpContext) {
    return view.render('product/create')
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      await product.delete()
      return response.status(200).json({
        message: 'Produto deletado com sucesso',
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao deletar produto',
        error: error.message,
      })
    }
  }

  async patch({ params, request}: HttpContext) {
    const product = await Product.findOrFail(params.id)

    const payload = await request.only(['name', 'price', 'description'])
    product.merge(payload)

    await product.save()

    return product
  }


}
