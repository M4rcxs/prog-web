import Product from '#models/product'
import { HttpContext } from '@adonisjs/core/http'
import ProductService from '#services/ProductService'
import Category from '#models/category'

export default class ProductsController {

  public async index({ view }: HttpContext) {
    const products = await Product.all()
    return view.render('products/products', { products })
  }

  public async show({ params, view, response }: HttpContext) {
    try {
        const product = await Product.query()
            .where('id', params.id)
            .preload('category')
            .first()

        if (!product) {
            return response.status(404).send('Produto não encontrado')
        }

        return view.render('products/show', { product })
    } catch (error) {
        console.error('Erro ao buscar produto:', error.message)
        return response.status(500).send('Erro interno do servidor')
    }
  }

  public async calculateShipping({ request, response }: HttpContext) {
    const cep = request.input('cep') 
    try {
      const endereco = await ProductService.getCep(cep)
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
    const data = request.only(['name', 'description', 'price', 'imageUrl', 'categoriaId', 'quantidade'])	
    try {
      await Product.create(data)

      return response.redirect('/home')
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao criar produto',
        error: error.message,
      })
    }
  }
  
  public async create({ view }: HttpContext) {
    const categories = await Category.all() 
    return view.render('products/create_product', { categories }) 
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
