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
    router.get('/', [ProductsController, 'index']).as('products.index');
  })
  .prefix('products')
  .as('products');

