document.addEventListener('DOMContentLoaded', () => {
  const cart = document.getElementById('cart');
  const closeCart = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const checkoutButton = document.getElementById('checkout-button');

  // Fechar o carrinho
  closeCart.addEventListener('click', () => {
    cart.classList.remove('open');
  });

  // Carregar os itens do carrinho via API
  async function loadCartItems() {
    try {
      const response = await fetch('/cart', {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar o carrinho');
      }

      const cart = await response.json();
      renderCartItems(cart.posts);
    } catch (error) {
      console.error(error);
      cartItemsContainer.innerHTML = '<p>Carrinho vazio.</p>';
    }
  }

  // Renderizar os itens do carrinho
  function renderCartItems(items) {
    cartItemsContainer.innerHTML = '';

    if (items.length === 0) {
      cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio</p>';
      return;
    }

    items.forEach((item) => {
      const product = item.product;
      const cartItem = document.createElement('div');
      cartItem.classList.add('flex', 'items-center', 'justify-between');

      cartItem.innerHTML = `
        <div class="flex items-center space-x-4">
          <img src="${product.imageUrl}" alt="${product.name}" class="w-16 h-16 rounded object-cover">
          <div>
            <h3 class="text-sm font-bold">${product.name}</h3>
            <p class="text-sm text-gray-500">Quantidade: ${item.quantity}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm font-bold">R$${(product.price * item.quantity).toFixed(2)}</p>
          <button class="text-red-500 hover:text-red-700 text-sm remove-item" data-id="${item.id}">Remover</button>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);
    });

    // Adicionar evento de remover item
    document.querySelectorAll('.remove-item').forEach((button) => {
      button.addEventListener('click', async (e) => {
        const itemId = e.target.getAttribute('data-id');
        await removeItemFromCart(itemId);
        await loadCartItems(); // Recarregar os itens
      });
    });
  }

  // Remover item do carrinho
  async function removeItemFromCart(itemId) {
    try {
      const response = await fetch(`/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao remover o item do carrinho');
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Finalizar compra
  checkoutButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/cart/checkout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao finalizar a compra');
      }

      alert('Compra finalizada com sucesso!');
      cart.classList.remove('open'); // Fecha o carrinho
      await loadCartItems(); // Limpa o carrinho
    } catch (error) {
      console.error(error);
      alert('Erro ao finalizar a compra');
    }
  });

  // Carregar os itens ao iniciar
  loadCartItems();
});
