// Sample laptop catalog data
const products = [
    {
        id: 1,
        name: "Lenovo ThinkPad X1 Carbon",
        price: 145000,
        specs: "Intel Core i7 | 16GB RAM | 512GB SSD | 14\" FHD display",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500"
    },
    {
        id: 2,
        name: "HP EliteBook 840 G8",
        price: 95000,
        specs: "Intel Core i5 | 16GB RAM | 256GB SSD | Windows 11 Pro",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=500"
    },
    {
        id: 3,
        name: "MacBook Air M2",
        price: 160000,
        specs: "Apple M2 Chip | 8GB Unified RAM | 256GB SSD | Liquid Retina",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500"
    },
    {
        id: 4,
        name: "Dell XPS 13 9315",
        price: 135000,
        specs: "Intel Core i7 | 16GB RAM | 512GB NVMe SSD | Intel Iris Xe",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=500"
    }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const cartIconBtn = document.getElementById('cart-icon-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// 1. Render Products onto page
function displayProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-specs">${product.specs}</p>
                <p class="product-price">Ksh ${product.price.toLocaleString()}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// 2. Cart Functionality
function addToCart(productId) {
    const selectedProduct = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...selectedProduct, quantity: 1 });
    }

    updateCartUI();
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    // Update count badge
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalCount;

    // Render cart layout
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        cartTotalElement.innerText = "Ksh 0";
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Ksh ${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <i class="fas fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
        </div>
    `).join('');

    // Calculate total price
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.innerText = `Ksh ${totalAmount.toLocaleString()}`;
}

// 3. Drawer Toggle Actions
function openCart() {
    cartSidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
}

// Event Listeners
cartIconBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
sidebarOverlay.addEventListener('click', closeCart);

checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for shopping! Proceeding to setup your payment details.");
        cart = [];
        updateCartUI();
        closeCart();
    }
});

// Run display function on load
document.addEventListener('DOMContentLoaded', displayProducts);