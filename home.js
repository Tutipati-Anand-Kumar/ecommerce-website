import addProduct, { handleProductBind } from "./addProducts.js";
import { handleCartBind } from "./cart.js";

let allProducts = [];

const home = () => {
    return `<div id="products-container" class="products"></div>`;
};

export const handleHomeBind = () => {
    const productsDiv = document.getElementById("products-container");
    const searchInput = document.getElementById("search-input");
    const addProductLink = document.getElementById("add-product-link");

    const fetchAndDisplayProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/products/all");
            const products = await response.json();
            allProducts = products;
            displayProducts(allProducts);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            productsDiv.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
        }
    };

    const displayProducts = (products) => {
        productsDiv.innerHTML = '';
        if (products.length === 0) {
            productsDiv.innerHTML = `<p>No products found.</p>`;
            return;
        }
        
        products.forEach(product => {
            productsDiv.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-info">
                        <p class="product-title">${product.title}</p>
                        <p class="product-price">₹ ${product.price}</p>
                        <p class="product-description">${product.description}</p>
                        <p class="product-category">${product.category}</p>
                    </div>
                     <div class="spacer"></div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" data-product-id="${product._id}">Add to Cart</button>
                    </div>
                </div>
            `;
        });

        // After rendering, bind the "Add to Cart" button listeners
        bindAddToCartButtons();
    };

    const bindAddToCartButtons = () => {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                const productToAdd = allProducts.find(p => p._id === productId);
                if (productToAdd) {
                    addToCart(productToAdd);
                }
            });
        });
    };

    const addToCart = (product) => {
        let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
        const existingItem = cartItems.find(item => item._id === product._id);
    
        if (existingItem) {
            alert("This product is already in your cart. You can change the quantity in the cart view.");
        } else {
            cartItems.push({ ...product, quantity: 1 });
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
            updateCartCount();
            alert(`${product.title} has been added to your cart.`);
        }
    };
    
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filteredProducts = allProducts.filter(p =>
            p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    });

    fetchAndDisplayProducts();
};

export const updateCartCount = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const countElement = document.getElementById("cart-count");
    if (countElement) {
        countElement.textContent = cart.length;
    }
};

export default home;