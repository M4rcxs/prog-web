//arquivo routes.ts

import router from '@adonisjs/core/services/router'

import ProductsController from '#controllers/products_controller'

router.group(() => {
  router.get('/', [ProductsController, 'index']).as('products')
  router.post('/store', [ProductsController, 'store']).as('store').middleware([]);
  router.get('/create', [ProductsController, 'create']).as('create')
  router.get('/:id', [ProductsController, 'show']).as('show')
  router.delete('/:id', [ProductsController, 'destroy']).as('destroy')
  router.patch('/:id', [ProductsController, 'patch']).as('patch')
})
.prefix('products')
.as('products')

router.get('/', async ({ response }) => {
  return response.send('API de Produtos. Acesse /products para ver os produtos.')
})


