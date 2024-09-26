//arquivo routes.ts

import router from '@adonisjs/core/services/router'

import ProductsController from '#controllers/products_controller'

router.group(() => {
  router.get('/', [ProductsController, 'index']).as('products')
  router.post('/', [ProductsController, 'create']).as('create')
})
.prefix('products')
.as('products')

router.get('/', async ({ response }) => {
  return response.send('API de Produtos. Acesse /products para ver os produtos.')
})


