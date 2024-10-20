import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    const data = request.only(['full_name', 'email', 'password', 'phone'])

    try {
      const user = await User.create(data)
      return user
    } catch (error) {
      return response.badRequest('Unable to register user')
    }
  }

  public async store({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
  
    try {
      const user = await User.verifyCredentials(email, password)
      return response.ok({ message: 'Login successful', user })
    } catch (error) {
      return response.unauthorized('Invalid email or password')
    }
  }

  public async create({ request, response }: HttpContext) {
    // falta retornar a view de criar usuario
    return response.ok({ message: 'User registration page' })
  }

  public async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return user
    } catch (error) {
      return response.notFound('User not found')
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.ok({ message: 'User deleted successfully' })
    } catch (error) {
      return response.badRequest('Unable to delete user')
    }
  }

  public async patch({ params, request, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      const data = request.only(['full_name', 'email', 'password', 'phone'])
      user.merge(data)
      await user.save()
      return user
    } catch (error) {
      return response.badRequest('Unable to update user')
    }
  }

  public async logout({ auth, response }: HttpContext) {
    try {
      
      await auth.use('web') 

      return response.ok({ message: 'User logged out successfully' })
    } catch (error) {
      return response.internalServerError('Error logging out user')
    }
  }
}
