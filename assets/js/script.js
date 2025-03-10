const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide() {
    slides.forEach((slide, index) => {
        slide.style.display = (index === currentSlide) ? "block" : "none";
    });

    currentSlide = (currentSlide + 1) % slides.length;
}

setInterval(showSlide, 3000); // Auto-slide every 3 seconds
// Sample Product Data
const products = [
    { id: 1, name: "Men's T-Shirt", price: 25, category: "men", image: "../assets/images/product1.jpg" },
    { id: 2, name: "Women's Dress", price: 40, category: "women", image: "../assets/images/product2.jpg" },
    { id: 3, name: "Stylish Jacket", price: 75, category: "men", image: "../assets/images/product3.jpg" },
    { id: 4, name: "Elegant Handbag", price: 90, category: "accessories", image: "../assets/images/product4.jpg" },
    { id: 5, name: "Casual Sneakers", price: 60, category: "men", image: "../assets/images/product5.jpg" },
    { id: 6, name: "Women's Scarf", price: 20, category: "women", image: "../assets/images/product6.jpg" }
];

// Load Products
function loadProducts(filterCategory = 'all', maxPrice = 200) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';  // Clear previous products

    const filteredProducts = products.filter(product =>
        (filterCategory === 'all' || product.category === filterCategory) &&
        product.price <= maxPrice
    );

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productGrid.appendChild(productCard);
    });
}

// Filter Logic
document.getElementById('category').addEventListener('change', function () {
    loadProducts(this.value);
});

document.getElementById('price-range').addEventListener('input', function () {
    const priceValue = document.getElementById('price-value');
    priceValue.textContent = `$${this.value}`;
    loadProducts(document.getElementById('category').value, Number(this.value));
});

// Add to Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    alert(`${product.name} added to cart!`);
}

// Load products on page load
window.onload = () => loadProducts();

// Image Switching Logic
function changeImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageSrc;
}

// Add to Cart Logic
function addToCart() {
    const productName = document.querySelector('.product-info h2').innerText;
    const productPrice = document.querySelector('.product-info .price').innerText;
    const selectedSize = document.getElementById('size').value;
    const selectedColor = document.getElementById('color').value;

    alert(`${productName} (${selectedSize}, ${selectedColor}) added to cart for ${productPrice}!`);
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart Function
function addToCart() {
    const productName = document.querySelector('.product-info h2').innerText;
    const productPrice = parseFloat(document.querySelector('.product-info .price').innerText.replace('$', ''));
    const selectedSize = document.getElementById('size').value;
    const selectedColor = document.getElementById('color').value;

    const item = {
        name: productName,
        price: productPrice,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
        image: document.getElementById('mainImage').src
    };

    // Check if item already exists
    const existingItem = cart.find(p => p.name === item.name && p.size === item.size && p.color === item.color);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
}

// Display Cart Items
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size} | Color: ${item.color}</p>
                    <p>$${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                </div>
                <div class="item-quantity">
                    <button onclick="updateQuantity(${index}, 'decrease')">➖</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 'increase')">➕</button>
                </div>
                <button onclick="removeFromCart(${index})">❌</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartTotalElement.textContent = total.toFixed(2);
}

// Update Quantity
function updateQuantity(index, action) {
    if (action === 'increase') {
        cart[index].quantity++;
    } else if (action === 'decrease' && cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Checkout Process
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some items before checkout.");
        return;
    }

    alert("Checkout successful! Thank you for shopping with us.");
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Load Cart on Page Load
window.onload = function () {
    if (document.getElementById('cart-items')) {
        displayCart();
    }
};
// Display Cart Items in Checkout
function displayCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const checkoutTotalElement = document.getElementById('checkout-total');
    checkoutItemsContainer.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const checkoutItem = document.createElement('div');
            checkoutItem.classList.add('checkout-item');
            checkoutItem.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${itemTotal.toFixed(2)}</span>
            `;
            checkoutItemsContainer.appendChild(checkoutItem);
        });
    }

    checkoutTotalElement.textContent = total.toFixed(2);
}

// Checkout Form Submission
document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty! Add some items before placing an order.");
        return;
    }

    const customerName = document.getElementById('name').value;
    const customerEmail = document.getElementById('email').value;
    const customerAddress = document.getElementById('address').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // Mock Payment Processing
    alert(`
        Order Confirmed!
        Name: ${customerName}
        Email: ${customerEmail}
        Address: ${customerAddress}
        Payment Method: ${paymentMethod}
        Total Amount: $${document.getElementById('checkout-total').textContent}
    `);

    // Clear cart after checkout
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCheckoutItems();
});

// Load Checkout Items on Page Load
window.onload = function () {
    if (document.getElementById('checkout-items')) {
        displayCheckoutItems();
    }
};
