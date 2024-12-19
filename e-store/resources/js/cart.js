document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  const showNotification = (message, type = 'success') => {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');

    // Estilo da notificação
    notification.style.padding = '10px 20px';
    notification.style.marginBottom = '10px';
    notification.style.borderRadius = '5px';
    notification.style.color = '#fff';
    notification.style.fontSize = '16px';
    notification.style.boxShadow = '0px 4px 6px rgba(0,0,0,0.1)';
    notification.style.transition = 'opacity 0.5s ease-in-out';

    // Escolher cor baseada no tipo
    notification.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';

    // Conteúdo da notificação
    notification.innerText = message;

    // Adicionar a notificação ao contêiner
    notificationContainer.appendChild(notification);

    // Remover a notificação após 3 segundos
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.remove();
      }, 500); // Espera o fade-out
    }, 3000);
  };

  addToCartButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      const productId = e.target.getAttribute('data-id');
      console.log(productId);

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
        showNotification('Produto adicionado ao carrinho com sucesso!', 'success');
        window.location.reload();
      } catch (error) {
        console.error(error);
        showNotification('Erro ao adicionar o produto ao carrinho.', 'error');
      }
    });
  });
});
