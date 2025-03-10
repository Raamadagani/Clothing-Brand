// Sample Product Data
let products = JSON.parse(localStorage.getItem('products')) || [];

// Display Products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (products.length === 0) {
        productList.innerHTML = '<p>No products added yet.</p>';
    } else {
        products.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
                <div>
                    <h4>${product.name}</h4>
                    <p>Category: ${product.category}</p>
                    <p>Price: $${product.price}</p>
                </div>
                <button onclick="deleteProduct(${index})">❌ Delete</button>
            `;

            productList.appendChild(productItem);
        });
    }
}

// Add Product Logic
document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;
    const image = document.getElementById('product-image').value;

    const newProduct = { name, price, category, image };
    products.push(newProduct);

    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();

    alert('Product added successfully!');
    document.getElementById('product-form').reset();
});

// Delete Product Logic
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Secure Admin Access
function checkAdminAccess() {
    const adminUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!adminUser || adminUser.email !== 'admin@brand.com') {
        alert("Unauthorized Access! Redirecting to Home.");
        window.location.href = '../index.html';
    }
}

// Logout
function logout() {
    localStorage.removeItem('loggedInUser');
    alert("You have successfully logged out.");
    window.location.href = 'login.html';
}

// Load Products on Page Load
window.onload = function () {
    checkAdminAccess();
    displayProducts();
};
