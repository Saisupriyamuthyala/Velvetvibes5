 <script>
        document.addEventListener('DOMContentLoaded', () => {
            const products = [
                { id: 1, name: 'Aspirin', category: 'medicine', price: 5.99, rating: 4.5, image: 'https://5.imimg.com/data5/SELLER/Default/2023/7/330506870/UM/GZ/QO/135658020/aspirin-dispersible-tablets.jpg' },
                { id: 2, name: 'Toothpaste', category: 'personal-care', price: 2.99, rating: 4.0, image: 'https://www.jiomart.com/images/product/original/490002184/colgate-max-fresh-peppermint-ice-blue-gel-toothpaste-150-g-product-images-o490002184-p490002184-0-202306061334.jpg?im=Resize=(1000,1000)'},
                { id: 3, name: 'Vitamin C', category: 'health-supplements', price: 9.99, rating: 5.0, image: 'https://image.made-in-china.com/2f0j00eonhtSYlAvGs/Vitamin-C-Chewable-Tablet-100mg-500mg-Health-Food-Vitamin-Shinepharm.webp' },
                { id: 4, name: 'Cough Syrup', category: 'medicine', price: 7.99, rating: 3.5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Qiu_57tvIEEzNVwVr30bGcW1xh9EHMvrYA&s' },
                { id: 5, name: 'Shampoo', category: 'personal-care', price: 4.99, rating: 4.2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-50p9ibJpbhz6JsZGPuBmLJfP-XkcT3Vng&s' },
                { id: 6, name: 'Multivitamins', category: 'health-supplements', price: 12.99, rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyEH9N8ZQUDPC_WV-xIZ9QZnFVtyCH3Z9Lww&s' }
            ];
    
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
            const productList = document.getElementById('product-list');
            const categorySelect = document.getElementById('category');
            const priceSelect = document.getElementById('price');
            const cartButton = document.getElementById('cart-button');
            const cartPopup = document.getElementById('cart-popup');
            const cartItems = document.getElementById('cart-items');
            const checkoutButton = document.getElementById('checkout-button');
    
            // Function to display products
            const displayProducts = (filteredProducts) => {
                productList.innerHTML = '';
                filteredProducts.forEach(product => {
                    const div = document.createElement('div');
                    div.classList.add('product-item');
                    div.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price.toFixed(2)}</p>
                        <p>Rating: ${product.rating} / 5</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    `;
                    productList.appendChild(div);
                });
            };
    
            // Function to filter and sort products
            const filterAndSortProducts = () => {
                let filtered = products;
    
                const selectedCategory = categorySelect.value;
                if (selectedCategory !== 'all') {
                    filtered = filtered.filter(product => product.category === selectedCategory);
                }
    
                const selectedPrice = priceSelect.value;
                if (selectedPrice === 'low-to-high') {
                    filtered = filtered.sort((a, b) => a.price - b.price);
                } else if (selectedPrice === 'high-to-low') {
                    filtered = filtered.sort((a, b) => b.price - a.price);
                }
    
                displayProducts(filtered);
            };
    
            // Function to add products to the cart
            window.addToCart = (productId) => {
                const product = products.find(p => p.id === productId);
                const existingProductIndex = cart.findIndex(item => item.id === productId);
    
                if (existingProductIndex === -1) {
                    cart.push({ ...product, quantity: 1 });
                } else {
                    cart[existingProductIndex].quantity++;
                }
    
                // Save cart to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
    
                // Update the cart button count and the cart popup
                updateCartButton();
                updateCartPopup();
            };
    
            // Function to update the cart button (display the number of items)
            const updateCartButton = () => {
                const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartButton.textContent = `Cart (${cartCount})`;
            };
    
            // Function to update the cart popup
            const updateCartPopup = () => {
                cartItems.innerHTML = '';
                cart.forEach(item => {
                    const div = document.createElement('div');
                    div.classList.add('cart-item');
                    div.innerHTML = `
                        <span>${item.name} (x${item.quantity})</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    `;
                    cartItems.appendChild(div);
                });
            };
    
            // Function to toggle the cart popup visibility
            const toggleCartPopup = () => {
                cartPopup.style.display = cartPopup.style.display === 'flex' ? 'none' : 'flex';
            };
            cartButton.addEventListener('click', toggleCartPopup);
            checkoutButton.addEventListener('click', () => alert('Proceeding to checkout...'));
    
    
            checkoutButton.addEventListener('click', () => {
                if (cart.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }

                const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const customerName = prompt('Please enter your name:');
                const customerEmail = prompt('Please enter your email:');

                if (!customerName || !customerEmail) {
                    alert('Please provide your name and email to proceed.');
                    return;
                }

                // Display confirmation message
                alert(`Thank you for your purchase, ${customerName}!\nTotal: $${totalAmount.toFixed(2)}\nWe will send a confirmation to ${customerEmail}.`);

                // Clear the cart
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartButton();
                updateCartPopup();
            });

            // Event listeners for filtering and sorting
            categorySelect.addEventListener('change', filterAndSortProducts);
            priceSelect.addEventListener('change', filterAndSortProducts);

            // Initial setup: Display products and update the cart
            displayProducts(products);
            updateCartButton();
        });
    </script>
