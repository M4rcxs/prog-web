document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      const productId = e.target.getAttribute('data-id');
      
      try {
        const response = await fetch('/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ product_id: productId, quantity: 1 }),
        });

        if (!response.ok) {
          throw new Error('Erro ao adicionar ao carrinho');
        }

        const result = await response.json();
        alert(result.message || 'Produto adicionado ao carrinho com sucesso!');
      } catch (error) {
        console.error(error);
        alert('Erro ao adicionar o produto ao carrinho.');
      }
    });
  });
});
