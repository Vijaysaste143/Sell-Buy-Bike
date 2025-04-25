let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCart(productName, price) {
    const item = { name: productName, price: price };
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    alert(`${productName} has been added to your cart!`);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cartItems.length;
    const cartLink = document.querySelector('.nav-link[href="cart.html"]');
    cartLink.textContent = `Cart (${cartCount})`;
}

updateCartCount();

function abc(searchTerm) {
    const products = document.querySelectorAll('.product');
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; 

    products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        const price = product.querySelector('button[onclick]').getAttribute('onclick').match(/'([^']+)', (\d+)/);
        const productPrice = price ? price[2] : 0;

        if (productName.includes(searchTerm.toLowerCase())) {
            const col = document.createElement('div');
            col.className = "col-md-4 mb-3";
            col.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${product.querySelector('.product-name').textContent}</h5>
                        <p class="card-text">Price: Rs ${productPrice}</p>
                        <button class="btn btn-primary" onclick="addToCart('${product.querySelector('.product-name').textContent}', ${productPrice})">Add to Cart</button>
                    </div>
                </div>
            `;
            searchResults.appendChild(col);
        }
    });

    if (searchResults.children.length > 0) {
        const searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
        searchModal.show();
    } else {
        alert("No results found.");
    }
}
