import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints da sua aplicação. Cada entrypoint resultará em um
       * bundle separado.
       */
      entrypoints: [
        'resources/css/app.css', // Estilos globais
        'resources/js/app.js', // Script global
        'resources/js/navbar.js', // Script para Navbar
        'resources/js/cartSide.js', // Script para Carrinho Lateral
        'resources/js/cart.js', // Adiciona o script do carrinho
      ],

      /**
       * Caminhos para assistir e recarregar o navegador ao alterar arquivos
       */
      reload: ['resources/views/**/*.edge'],
    }),
  ],
})
