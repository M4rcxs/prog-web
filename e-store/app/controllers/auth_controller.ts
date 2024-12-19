import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { createAuthValidator } from '#validators/auth'
import { middleware } from '#start/kernel'
import session from '#config/session'

export default class AuthController {
  public async register({ params, request, response }: HttpContext) {
    const id = params.id // Obtém o ID da rota, se fornecido

    if (id) {
      // Editando um usuário existente
      try {
        const user = await User.findOrFail(id) // Busca o usuário ou lança um erro 404
        const data = request.only(['full_name', 'email', 'phone']) // Dados que podem ser atualizados

        user.merge(data) // Atualiza apenas os campos fornecidos
        await user.save() // Salva as alterações no banco de dados
        return response.redirect().toRoute('/home') // Redireciona após a edição
      } catch (error) {
        console.error('Erro ao buscar usuário:', error.message)
        return response.status(404).send('Usuário não encontrado.')
      }
    } else {
      // Criando um novo usuário
      try {
        const newUserData = request.only(['full_name', 'email', 'password', 'phone']) // Inclui os dados necessários
        const user = await User.create(newUserData) // Cria o novo usuário
        return response.redirect().toRoute('auth.login') // Redireciona para a rota de login
      } catch (error) {
        console.error('Erro ao criar usuário:', error.message)
        return response.redirect().toRoute('auth.login') // Retorna os erros de validação
      }
    }
  }

  async store({ auth, request, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(createAuthValidator)

    const user = await User.findBy('email', email)

    if (!user) {
      session.flash({ error: 'E-mail ou senha inválidos' })
      return response.redirect().toRoute('/auth/login')
    }

    try {
      await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      return response.redirect().toRoute('/home')
    } catch {
      session.flash({ error: 'E-mail ou senha inválidos' })
      return response.redirect().toRoute('/auth/login')
    }
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
      return response.redirect().toRoute('index')
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
    await auth.use('web').logout()

    return response.redirect().toRoute('/')
  }
}
