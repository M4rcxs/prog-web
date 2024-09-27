import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class ProductSeeder extends BaseSeeder {
  public async run () {
    // Adicione aqui os dados que você deseja inserir na tabela `products`
    await Product.createMany([
      {
        name: 'Produto 1',
        description: 'Descrição do Produto 1',
        imageUrl: 'https://picsum.photos/seed/produto1/600/400',
        price: 100.00
      },
      {
        name: 'Produto 2',
        description: 'Descrição do Produto 2',
        imageUrl: 'https://picsum.photos/seed/produto2/600/400',
        price: 200.00
      },
      {
        name: 'Produto 3',
        description: 'Descrição do Produto 3',
        imageUrl: 'https://picsum.photos/seed/produto3/600/400',
        price: 300.00
      },
      {
        name: 'Produto 4',
        description: 'Descrição do Produto 4',
        imageUrl: 'https://picsum.photos/seed/produto4/600/400',
        price: 400.00
      },
      {
        name: 'Produto 5',
        description: 'Descrição do Produto 5',
        imageUrl: 'https://picsum.photos/seed/produto5/600/400',
        price: 500.00
      },
    ])
  }
}
