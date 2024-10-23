import { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'

export default class CategoriesController {
	public async index({ view }: HttpContext) {
		const categories = await Category.all()
		return view.render('categories/categories', { categories })
	}
	
	public async show({ params, view }: HttpContext) {
    const category = await Category.find(params.id)
    
    if (!category) {
      console.log('Categoria não encontrada') 
    }
    return view.render('category/show', { category })
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'description'])	
    try {
      const category = await Category.create(data)

      return response.status(201).json(category)
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao criar categoria',
        error: error.message,
      })
    }
  }
  
  public async create({ view }: HttpContext) {
    return view.render('category/create_category')
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const category = await Category.findOrFail(params.id)
      await category.delete()
      return response.status(200).json({
        message: 'Categoria deletada com sucesso',
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao deletar categoria',
        error: error.message,
      })
    }
  }

  async patch({ params, request}: HttpContext) {
    const category = await Category.findOrFail(params.id)

    const payload = await request.only(['name', 'description'])
    category.merge(payload)

    await category.save()

    return category
  }
}