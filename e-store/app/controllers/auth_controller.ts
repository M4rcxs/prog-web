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

  public async login({ request, auth, response }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      // Use `auth.attempt()` para autenticar com `SessionGuard`
      await auth.authenticate.arguments(email, password)
      return response.ok({ message: 'Login successful' })
    } catch {
      return response.badRequest('Invalid email or password')
    }
  }

  // public async logout({ auth, response }: HttpContext) {
  //   await auth.defaultGuard().logout()
  //   return response.ok({ message: 'User logged out successfully' })
  // }
}
