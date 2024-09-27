//arquivo routes.ts

import router from '@adonisjs/core/services/router'

import ProductsController from '#controllers/products_controller'
import HomeController from '#controllers/home_controller'

router.group(() => {
  router.get('/', [ProductsController, 'index']).as('index')
  router.post('/store', [ProductsController, 'store']).as('store')
  router.get('/create', [ProductsController, 'create']).as('create')
  router.get('/:id', [ProductsController, 'show']).as('show')
  router.delete('/:id', [ProductsController, 'destroy']).as('destroy')
  router.patch('/:id', [ProductsController, 'patch']).as('patch')
})
.prefix('products')
.as('products')
router.post('/calculate-shipping', [ProductsController, 'calculateShipping']).as('calculateShipping')

router.get('/', [HomeController, 'index']).as('index')



