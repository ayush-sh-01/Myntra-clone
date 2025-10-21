
        const products = [
            { id: 1, name: 'Premium Formal Blazer', brand: 'Invictus', price: 2499, original: 4499, discount: 44, category: 'shirts', image: 'https://images.unsplash.com/photo-1591047990852-ec2d3b-e0d42?w=400&h=500&fit=crop', rating: 4.5 },
            { id: 2, name: 'Casual Cotton T-Shirt', brand: 'GAP', price: 799, original: 1299, discount: 38, category: 'shirts', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop', rating: 4.3 },
            { id: 3, name: 'Designer Denim Jeans', brand: 'Levi\'s', price: 1999, original: 3499, discount: 43, category: 'shirts', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=500&fit=crop', rating: 4.6 },
            { id: 4, name: 'Stylish Sneakers', brand: 'Nike', price: 3499, original: 5999, discount: 42, category: 'shoes', image: 'https://images.unsplash.com/photo-1595591437281-260bbb06d6a6?w=400&h=500&fit=crop', rating: 4.4 },
            { id: 5, name: 'Summer Dress Collection', brand: 'Zara', price: 1499, original: 2799, discount: 46, category: 'dresses', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop', rating: 4.7 },
            { id: 6, name: 'Luxury Watch', brand: 'Fossil', price: 4999, original: 6299, discount: 21, category: 'watches', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop', rating: 4.8 },
            { id: 7, name: 'Statement Earrings', brand: 'Zaveri Pearl', price: 599, original: 1199, discount: 50, category: 'accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop', rating: 4.5 },
            { id: 8, name: 'Sports Running Shoe', brand: 'Adidas', price: 2999, original: 4499, discount: 33, category: 'shoes', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop', rating: 4.6 }
        ];

        let cart = [];
        let wishlist = [];
        let currentFilter = 'all';

    
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts(products);
            setupEventListeners();
        });

        
        function setupEventListeners() {
            window.addEventListener('scroll', toggleScrollToTop);
            document.getElementById('searchInput').addEventListener('input', handleSearch);
        }

        
        function renderProducts(productsToRender) {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';
            
            productsToRender.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div class="product-image-container">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">♡</button>
                        <div class="discount-badge">${product.discount}% OFF</div>
                    </div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-rating">⭐ ${product.rating} (${Math.floor(Math.random() * 500) + 100} reviews)</div>
                        <div class="product-price-section">
                            <div class="price-row">
                                <span class="product-price">₹${product.price}</span>
                                <span class="product-original">₹${product.original}</span>
                            </div>
                        </div>
                        <button class="add-to-bag" onclick="addToCart(${product.id})">Add to Bag</button>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        function filterProducts(category) {
            currentFilter = category;
            
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            if (category === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
        }

        function handleSearch(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.brand.toLowerCase().includes(searchTerm)
            );
            renderProducts(filtered);
        }

        // Add to Cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCartUI();
            showNotification(`${product.name} added to bag!`);
        }

        function updateCartUI() {
            const cartItemsDiv = document.getElementById('cartItems');
            const badge = document.getElementById('cartBadge');
            
            if (cart.length === 0) {
                cartItemsDiv.innerHTML = '<div class="cart-empty">Your bag is empty</div>';
                badge.style.display = 'none';
                return;
            }

            badge.textContent = cart.length;
            badge.style.display = 'flex';

            cartItemsDiv.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price}</div>
                        <div class="remove-btn" onclick="removeFromCart(${item.id})">Remove</div>
                    </div>
                </div>
            `).join('');
        }


        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
            showNotification('Item removed from bag');
        }

    
        function toggleCart() {
            document.getElementById('cartSidebar').classList.toggle('open');
        }


        function toggleWishlist(productId) {
            const product = products.find(p => p.id === productId);
            const index = wishlist.findIndex(item => item.id === productId);

            if (index > -1) {
                wishlist.splice(index, 1);
                showNotification(`${product.name} removed from wishlist`);
            } else {
                wishlist.push(product);
                showNotification(`${product.name} added to wishlist!`);
            }

            const badge = document.getElementById('wishlistBadge');
            if (wishlist.length > 0) {
                badge.textContent = wishlist.length;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }

        function checkout() {
            if (cart.length === 0) {
                showNotification('Your bag is empty!');
                return;
            }
            showNotification('Proceeding to checkout... 🎉');
            setTimeout(() => {
                cart = [];
                updateCartUI();
                toggleCart();
            }, 1500);
        }

        function openProfile() {
            document.getElementById('profileModal').style.display = 'block';
        }

        function closeProfile() {
            document.getElementById('profileModal').style.display = 'none';
        }

        function saveProfile() {
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            if (name && email) {
                showNotification(`Profile saved! Welcome ${name} 👋`);
                closeProfile();
            }
        }

        function toggleScrollToTop() {
            const btn = document.getElementById('scrollToTop');
            if (window.scrollY > 300) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        }

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }


        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 2000);
        }

       
        window.onclick = function(event) {
            const modal = document.getElementById('profileModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
    