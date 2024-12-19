import { HttpContext } from '@adonisjs/core/http'
import AddressShipping from '#models/address_shipping'

export default class AddressShippingsController {
  // Lista todos os endereços do usuário autenticado
  public async index({ auth, view }: HttpContext) {
    const user = await auth.use('web').authenticate();
    const addresses = await AddressShipping.query().where('user_id', user.id)

    // Verifica se há endereços cadastrados
		if (addresses.length > 0) {
			return view.render('addresses_shipping/addresses_list', { addresses })
		} else {
			return view.render('addresses_shipping/create_address')
		}
  }

  // Exibe um endereço específico
  public async show({ params, response, auth }: HttpContext) {
		const user = await auth.use('web').authenticate();

    const address = await AddressShipping.query()
      .where('id', params.id)
      .andWhere('user_id', user.id)
      .first()

    if (!address) {
      return response.status(404).json({ message: 'Endereço não encontrado' })
    }

    return address
  }

  public async create({ view }: HttpContext) {
    return view.render('address_shipping/create')
  }

  // Salva um novo endereço no banco de dados
  public async store({ request, response, auth }: HttpContext) {
		const user = await auth.use('web').authenticate();

    const data = request.only([
      'full_name',
      'phone',
      'cep',
      'state_city',
      'neighborhood',
      'street',
      'number',
      'complement',
      'save_as',
    ])

    await AddressShipping.create({ ...data, user_id: user.id });

    return response.redirect().toRoute('address_shipping.index');
  }

  // Atualiza um endereço existente
  public async update({ params, request, response, auth }: HttpContext) {
		const user = await auth.use('web').authenticate();

    const address = await AddressShipping.query()
      .where('id', params.id)
      .andWhere('user_id', user.id)
      .firstOrFail()

    const data = request.only([
      'full_name',
      'phone',
      'cep',
      'state_city',
      'neighborhood',
      'street',
      'number',
      'complement',
      'save_as',
    ])

    address.merge(data)
    await address.save()

    return response.json(address)
  }

  // Deleta um endereço
  public async destroy({ params, response, auth }: HttpContext) {
		const user = await auth.use('web').authenticate();

    const address = await AddressShipping.query()
      .where('id', params.id)
      .andWhere('user_id', user.id)
      .firstOrFail()

    await address.delete()

    return response.status(200).json({ message: 'Endereço deletado com sucesso' })
  }
}
