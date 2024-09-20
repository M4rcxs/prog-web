/*
|---------------------------------------------------------------------------
| Routes file
|---------------------------------------------------------------------------
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ProductsController = () => import('#controllers/products_controller')

router.get('/', async ({ response }) => {
    return response.send('API de Produtos. Acesse /products para ver os produtos.');
  })
  

  router
  .group(() => {
    router.get('/', [ProductsController, 'index']).as('lista');
    router.get('/:id', [ProductsController, 'show']).where('id', router.matchers.number()).as('show');
    router.post('/', [ProductsController, 'store']).as('create');
    router.put('/:id', [ProductsController, 'update']).where('id', router.matchers.number()).as('update');
    router.delete('/:id', [ProductsController, 'destroy']).where('id', router.matchers.number()).as('destroy');
  })
  .prefix('products')
  .as('products');

