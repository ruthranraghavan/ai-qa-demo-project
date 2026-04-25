document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const productSection = document.getElementById('product-section');
    const cartSection = document.getElementById('cart-section');
    const successSection = document.getElementById('success-section');
    const loginStatus = document.getElementById('login-status');
    const loginError = document.getElementById('login-error');
    const cartItemsList = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    const backHomeBtn = document.getElementById('back-home');

    let cart = [];

    // Login logic
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // VALIDATION BUG: Hardcoded credentials, but it doesn't actually check the password correctly
        // It accepts any password if the username is 'admin'
        if (username === 'test_user' && password === 'password123') {
            onLoginSuccess(username);
        } else if (username === 'admin') {
            // Intentionally allowing any password for admin as a "bug" or "feature"
            onLoginSuccess('Admin User');
        } else {
            loginError.classList.remove('hidden');
        }
    });

    function onLoginSuccess(user) {
        loginSection.classList.add('hidden');
        productSection.classList.remove('hidden');
        cartSection.classList.remove('hidden');
        loginStatus.textContent = `Logged in as: ${user}`;
        loginError.classList.add('hidden');
    }

    // Add to cart logic
    document.querySelectorAll('.add-to-cart, .add-to-cart-typo').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productDiv = e.target.closest('.product');
            const productName = productDiv.querySelector('h3').textContent;
            cart.push(productName);
            updateCartUI();
        });
    });

    function updateCartUI() {
        cartItemsList.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            cartItemsList.appendChild(li);
        });
    }

    // Checkout logic
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        productSection.classList.add('hidden');
        cartSection.classList.add('hidden');
        successSection.classList.remove('hidden');
    });

    backHomeBtn.addEventListener('click', () => {
        successSection.classList.add('hidden');
        productSection.classList.remove('hidden');
        cartSection.classList.remove('hidden');
        cart = [];
        updateCartUI();
    });
});

// AI analysis trigger comment
