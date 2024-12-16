import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { createAuthValidator } from '#validators/auth'
import { middleware } from '#start/kernel'
import session from '#config/session'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    const data = request.only(['full_name', 'email', 'password', 'phone'])
    await User.create(data)

    return response.redirect().toRoute('auth.login')
  }

  async store({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(createAuthValidator)

    const user = await User.findBy('email', email)

    if (!user) {
      return response.abort('E-mail inválido')
    }

    await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.redirect().toRoute('/home')

  }

  public async loginView({ view }: HttpContext) {
    return view.render('auth/login')
  }

  public async create({ view }: HttpContext) {
    return view.render('auth/create_user')
  }

  public async profile({ view }: HttpContext) {
    return view.render('auth/userProfile')
  }

  public async show({ params, response, view }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return view.render('auth/userProfile', { user })
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
      const data = request.only(['full_name', 'email', 'phone'])
      user.merge(data)
      await user.save()
      return user
    } catch (error) {
      return response.badRequest('Unable to update user')
    }
  }

  public async logout({ auth, response }: HttpContext) {
    try {
      await auth.use('web').logout()
      return response.ok({ message: 'User logged out successfully' })
    } catch (error) {
      return response.internalServerError('Error logging out user')
    }
  }
}
