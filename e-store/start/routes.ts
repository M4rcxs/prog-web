//arquivo routes.ts

import router from '@adonisjs/core/services/router'
import ProductsController from '#controllers/products_controller'
import HomeController from '#controllers/home_controller'
import CategoriesController from '#controllers/categories_controller'
import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'
import CartsController from '#controllers/carts_controller'

// router
//  .get('dashboard', () => {})
//  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [ProductsController, 'index']).as('index')
    router.post('/store', [ProductsController, 'store']).as('store')
    router.get('/create', [ProductsController, 'create']).as('create').use(middleware.auth())
    router.get('/:id', [ProductsController, 'show']).as('show')
    router.delete('/:id', [ProductsController, 'destroy']).as('destroy')
    router.patch('/:id', [ProductsController, 'patch']).as('patch')
  })
  .prefix('products')
  .as('products')

router
  .group(() => {
    router.get('/', [CategoriesController, 'index']).as('index')
    router.post('/store', [CategoriesController, 'store']).as('store')
    router.get('/create', [CategoriesController, 'create']).as('create')
    router.get('/:id', [CategoriesController, 'show']).as('show')
    router.delete('/:id', [CategoriesController, 'destroy']).as('destroy')
    router.patch('/:id', [CategoriesController, 'patch']).as('patch')
  })
  .prefix('categories')
  .as('categories')

router
  .post('/calculate-shipping', [ProductsController, 'calculateShipping'])
  .as('calculateShipping')

router.get('/', [HomeController, 'index']).as('index')
router.get('/home', [HomeController, 'indexAuth']).as('indexAuth').use(middleware.auth())

router
  .group(() => {
    router.get('/login', [AuthController, 'loginView']).as('login') // Rota para abrir a página de login
    router.post('/register', [AuthController, 'register']).as('register')
    router.post('/store', [AuthController, 'store']).as('store') // Rota para realizar o login
    router.get('/create', [AuthController, 'create']).as('create_user')
    router.get('/:id', [AuthController, 'show']).as('show').use(middleware.auth())
    router.post('/userProfile', [AuthController, 'profile']).as('profile').use(middleware.auth())
    router.delete('/:id', [AuthController, 'destroy']).as('destroy')
    router.patch('/:id', [AuthController, 'patch']).as('patch')
    router.post('/logout', [AuthController, 'logout']).as('logout').use(middleware.auth())
  })
  .prefix('auth')
  .as('auth')

router
  .group(() => {
    router.get('/', [CartsController, 'index']).as('index').use(middleware.auth())
    router.post('/add', [CartsController, 'store']).as('store').use(middleware.auth())
    router.patch('/:id', [CartsController, 'patch']).as('patch').use(middleware.auth())
    router.delete('/:id', [CartsController, 'destroy']).as('destroy').use(middleware.auth())
    router.post('/checkout', [CartsController, 'checkout']).as('checkout').use(middleware.auth())
  })
  .prefix('cart')
  .as('cart')
