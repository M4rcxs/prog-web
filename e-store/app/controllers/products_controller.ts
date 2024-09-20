import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

interface Product {
  id: number
  name: string
  price: number
  description: string
}

export default class ProductsController {
  private products: Product[] = [
    { id: 1, name: 'Produto 1', price: 10.0, description: 'Descrição do Produto 1' },
    { id: 2, name: 'Produto 2', price: 20.0, description: 'Descrição do Produto 2' },
    { id: 3, name: 'Produto 3', price: 30.0, description: 'Descrição do Produto 3' },
    { id: 4, name: 'Produto 4', price: 40.0, description: 'Descrição do Produto 4' },
  ]

  public async index({ view }: HttpContextContract) {
    return view.render('products', { products: this.products })
  }

  public async show({ params, response }: HttpContextContract) {
    const product = this.products.find((p) => p.id === Number(params.id))
    if (product) {
      return view.render('product', { product }) // Se você tiver uma view específica para mostrar um único produto
    }
    return response.status(404).json({ message: 'Produto não encontrado' })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('create_product')
  }

  public async store({ request, response }: HttpContextContract) {
    const productData = request.only(['name', 'price', 'description'])

    // Garantir que o preço é um número, caso contrário, converta
    const newProduct = {
      id: this.products.length + 1,
      name: productData.name,
      price: parseFloat(productData.price), // Converte para número
      description: productData.description,
    }

    this.products.push(newProduct)
    return response.status(201).json(newProduct) // Retorna o novo produto
  }

  public async update({ params, request, response }: HttpContextContract) {
    const productIndex = this.products.findIndex((p) => p.id === Number(params.id))
    if (productIndex !== -1) {
      const updatedProduct = {
        ...this.products[productIndex],
        ...request.only(['name', 'price', 'description']),
      }
      this.products[productIndex] = updatedProduct
      return response.json(updatedProduct) // Ou renderize uma view
    }
    return response.status(404).json({ message: 'Produto não encontrado' })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const productIndex = this.products.findIndex((p) => p.id === Number(params.id))
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1)
      return response.status(204).send()
    }
    return response.status(404).json({ message: 'Produto não encontrado' })
  }
}
