import Product from '#models/product'

export default class ProductsController {
  
  public async index() {
    const products = await Product.all()
    
    return products
  }

  // public async store({ request, response }: HttpContextContract) {
  //   const name = request.input('name')
  //   const description = request.input('description')
  //   const price = request.input('price')

  //   const product = await Product.create({
  //     name,
  //     description,
  //     price,
  //   })

  //   return response.json(product) // Retorna o produto criado como JSON
  // }
}
