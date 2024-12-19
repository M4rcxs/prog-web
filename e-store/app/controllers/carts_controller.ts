import Cart from '#models/cart'
import ItensCart from '#models/itens_cart'
import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class CartsController {
  // Exibir o carrinho do usuário logado
  public async index({ auth, view, response }: HttpContext) {

			const user = await auth.use('web').authenticate();

      if (!user) {
        return response.unauthorized('Você precisa estar logado para acessar esta rota.');
      } 

			const cart = await Cart.query()
				.where('user_id', user.id)
				.preload('posts', (query) => {
					query.preload('product'); 
				})
				.firstOrFail(); 

			return response.ok(cart);
	
	}
	
  public async getByUser({ auth, response }: HttpContext) {
    try {
      const user = await auth.use('web').authenticate();
 
      const cart = await Cart.query()
        .where('user_id', user.id)
        .preload('posts', (query) => {
          query.preload('product'); 
        })
        .first();
  
      if (!cart) {
        return response.notFound('Carrinho não encontrado para o usuário logado.');
      }
 
      return response.ok(cart);
    } catch (error) {
      if (error.message === 'E_UNAUTHORIZED_ACCESS') {
        return response.unauthorized('Você precisa estar logado para acessar esta rota.');
      }

      return response.internalServerError({
        message: 'Ocorreu um erro ao buscar o carrinho.',
        error: error.message,
      });
    }
  }  

  // Adicionar item ao carrinho
  public async store({ auth, request, response }: HttpContext) {
    try {
      const user = await auth.use('web').authenticate()
      const { product_id, quantity } = request.only(['product_id', 'quantity'])

      const product = await Product.findOrFail(product_id)
      let cart = await Cart.query().where('user_id', user.id).first()

      // Criar carrinho se não existir
      if (!cart) {
        cart = await Cart.create({ user_id: user.id })
      }

      // Verificar se o item já está no carrinho
      const item = await ItensCart.query()
        .where('cart_id', cart.id)
        .andWhere('product_id', product.id)
        .first()

      if (item) {
        // Atualizar quantidade se o item já existir
        item.quantity += quantity
        await item.save()
      } else {
        // Adicionar novo item
        await ItensCart.create({
          cart_id: cart.id,
          product_id: product.id,
          quantity,
        })
      }

      return response.ok({ message: 'Item adicionado ao carrinho com sucesso' })
    } catch (error) {
      return response.badRequest('Erro ao adicionar item ao carrinho')
    }
  }

  // Remover item do carrinho
  public async destroy({ auth, params, response }: HttpContext) {
    try {
      const user = await auth.use('web').authenticate()
      const item = await ItensCart.query()
        .where('id', params.id)
        .andWhereHas('cart', (query) => {
          query.where('user_id', user.id)
        })
        .firstOrFail()

      await item.delete()
      return response.ok({ message: 'Item removido do carrinho' })
    } catch (error) {
      return response.badRequest('Erro ao remover item do carrinho')
    }
  }

  // Atualizar quantidade de um item no carrinho
  public async patch({ auth, params, request, response }: HttpContext) {
    try {
      const user = await auth.use('web').authenticate()
      const item = await ItensCart.query()
        .where('id', params.id)
        .andWhereHas('cart', (query) => {
          query.where('user_id', user.id)
        })
        .firstOrFail()

      const { quantity } = request.only(['quantity'])

      item.quantity = quantity
      await item.save()

      return response.ok({ message: 'Quantidade atualizada com sucesso' })
    } catch (error) {
      return response.badRequest('Erro ao atualizar item no carrinho')
    }
  }

  // Finalizar compra
  public async checkout({ auth, response }: HttpContext) {
    try {
      const user = await auth.use('web').authenticate()
      const cart = await Cart.query()
        .where('user_id', user.id)
        .preload('posts', (query) => {
          query.preload('product')
        })
        .firstOrFail()

      // Simular lógica de finalização (ex: salvar pedido em outra tabela, limpar carrinho, etc.)
      await cart.posts.forEach(async (item) => {
        // Lógica de salvar pedido aqui (opcional)
        await item.delete()
      })

      return response.ok({ message: 'Compra finalizada com sucesso!' })
    } catch (error) {
      return response.badRequest('Erro ao finalizar compra')
    }
  }
}
