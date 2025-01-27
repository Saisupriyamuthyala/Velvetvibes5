document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Matte Lipstick', category: 'makeup', price: 12.99, rating: 4.5, image: 'https://i.pinimg.com/736x/90/b2/2a/90b22aaa45d63709b196fca7e4761f5b.jpg' },
        { id: 2, name: 'Moisturizing Cream', category: 'skincare', price: 15.99, rating: 4.7, image: 'https://i.pinimg.com/736x/2a/f5/47/2af5474b8a6e467628abd194c3be4e74.jpg' },
        { id: 3, name: 'Velvet Aura', category: 'fragrances', price: 25.99, rating: 4.9, image: 'https://i.pinimg.com/736x/4f/d9/6c/4fd96ca9a4d1a0cf2a55167a277bb769.jpg' },
        { id: 4, name: 'Foundation', category: 'makeup', price: 18.99, rating: 4.6, image: 'https://i.pinimg.com/736x/ff/ec/9b/ffec9b29827e76becf1ca6757ea7db82.jpg' },
        { id: 5, name: 'Facial Cleanser', category: 'skincare', price: 10.99, rating: 4.3, image: 'https://i.pinimg.com/736x/d4/ce/c5/d4cec5233fbadd4863906b8a6b1c3be4.jpg' },
        { id: 6, name: 'Luna Mystique', category: 'fragrances', price: 30.99, rating: 4.5, image: 'https://i.pinimg.com/736x/22/91/12/22911272f83b943367f0511de9c277b2.jpg' },
        { id: 7, name: 'Ethereal Bloom', category: 'fragrances', price: 18.99, rating: 4.6, image: 'https://i.pinimg.com/736x/c6/ca/4c/c6ca4c8962036ba4734e9151cfca70a8.jpg' },
        { id: 8, name: 'RoseAura – Blush Radiance Palette', category: 'makeup', price: 20.99, rating: 4.7, image: 'https://i.pinimg.com/736x/d3/1e/7e/d31e7e4f25a0637a7e9684aa3f511158.jpg' },
        { id: 9, name: 'Pure Harmony – Hydrating Glow Serum', category: 'skincare', price: 19.99, rating: 4.5, image: 'https://i.pinimg.com/736x/e6/71/70/e67170d718fc7d94e084a71a32616670.jpg' },
    ];

    const productList = document.getElementById('product-list');
    const cartButton = document.getElementById('cart-button');
    const cartPopup = document.getElementById('cart-popup');
    const cartItems = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');
    const orderModal = document.getElementById('order-modal');
    const confirmOrderButton = document.getElementById('confirm-order');
    const cancelOrderButton = document.getElementById('cancel-order');

    let cart = [];

    const displayProducts = (filter = 'all', sort = 'low-to-high') => {
        productList.innerHTML = '';

        let filteredProducts = products.filter(product => filter === 'all' || product.category === filter);
        if (sort === 'low-to-high') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productElement);
        });
    };

    window.addToCart = (id) => {
        const product = products.find(p => p.id === id);
        const cartIndex = cart.findIndex(item => item.id === id);

        if (cartIndex !== -1) {
            cart[cartIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        cartButton.textContent = `Cart (${cart.reduce((total, item) => total + item.quantity, 0)})`;
        updateCartPopup();
    };

    const removeFromCart = (id) => {
        const cartIndex = cart.findIndex(item => item.id === id);

        if (cartIndex !== -1) {
            if (cart[cartIndex].quantity > 1) {
                cart[cartIndex].quantity -= 1;
            } else {
                cart.splice(cartIndex, 1);
            }
        }

        cartButton.textContent = `Cart (${cart.reduce((total, item) => total + item.quantity, 0)})`;
        updateCartPopup();
    };

    const updateCartPopup = () => {
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cart.forEach((item) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} x ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
    };

    checkoutButton.addEventListener('click', () => {
        const orderSummary = document.getElementById('order-summary');
        orderSummary.innerHTML = `
            <p><strong>Items:</strong></p>
            <ul>
                ${cart.map(item => `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
            </ul>
            <p><strong>Total: $${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</strong></p>
        `;
        orderModal.style.display = 'flex';
    });

    confirmOrderButton.addEventListener('click', () => {
        alert('Order Confirmed! Thank you for shopping with Velvet Vibes.');
        cart = [];
        cartButton.textContent = 'Cart (0)';
        cartPopup.style.display = 'none';
        orderModal.style.display = 'none';
        updateCartPopup();
    });

    cancelOrderButton.addEventListener('click', () => {
        orderModal.style.display = 'none';
    });

    cartButton.addEventListener('click', () => {
        cartPopup.style.display = cartPopup.style.display === 'flex' ? 'none' : 'flex';
    });

    const categorySelect = document.getElementById('category');
    const priceSelect = document.getElementById('price');

    categorySelect.addEventListener('change', () => {
        displayProducts(categorySelect.value, priceSelect.value);
    });

    priceSelect.addEventListener('change', () => {
        displayProducts(categorySelect.value, priceSelect.value);
    });

    // Initial Product Display
    displayProducts();
});
