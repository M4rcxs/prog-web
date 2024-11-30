document.addEventListener('DOMContentLoaded', () => {
  const cart = document.getElementById('cart');
  const toggleCart = document.getElementById('toggle-cart');

  // Abrir o carrinho
  toggleCart.addEventListener('click', () => {
    cart.classList.add('open');
  });
});
