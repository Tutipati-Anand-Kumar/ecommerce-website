import { updateCartCount } from "./home.js";
import renderContent from "./index.js";

const cart = () => {
    return `
        <div class="cart-page">
            <h2>Your Cart</h2>
            <div id="cart-items-container"></div>
            <div id="cart-summary-container"></div>
        </div>
    `;
};

export const handleCartBind = () => {
    const root = document.getElementById('root');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummaryContainer = document.getElementById('cart-summary-container');
    
    const renderCart = () => {
        const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = '';
        cartSummaryContainer.innerHTML = '';

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
            return;
        }

        let total = 0;
        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="item-details">
                        <p class="item-title">${item.title}</p>
                        <p class="item-price">₹ ${item.price}</p>
                        <div class="quantity-control">
                            <button class="quantity-btn" data-action="decrement" data-id="${item._id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" data-action="increment" data-id="${item._id}">+</button>
                        </div>
                    </div>
                    <div class="item-actions">
                        <p class="item-total">₹ ${itemTotal}</p>
                        <button class="remove-from-cart" data-id="${item._id}">Remove</button>
                    </div>
                </div>
            `;
        });
        
        cartSummaryContainer.innerHTML = `
            <div class="cart-summary">
                <p>Total Amount: <span>₹ ${total.toFixed(2)}</span></p>
                <div class="delivery-address">
                    <label for="delivery-location">Delivery Address:</label>
                    <input type="text" id="delivery-location" placeholder="Enter your address...">
                    <button id="get-location-btn">Use My Current Location</button>
                </div>

                <div class="payment-methods">
                    <label>Select Payment Method:</label>
                    <div class="payment-options">
                        <label>
                            <input type="radio" name="payment-method" value="upi" checked> UPI
                        </label>
                        <label>
                            <input type="radio" name="payment-method" value="netbanking"> Net Banking
                        </label>
                        <label>
                            <input type="radio" name="payment-method" value="cod"> Cash on Delivery
                        </label>
                    </div>
                </div>

                <button id="book-order-btn">Book Order</button>
                <a href="/home" class="go-back-link">Continue Shopping</a>
            </div>
        `;

        bindCartActions();
    };

    const bindCartActions = () => {
        const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
        
        cartItemsContainer.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const action = e.target.dataset.action;
                let newCart = [...cartItems];
                const item = newCart.find(i => i._id === id);

                if (item) {
                    if (action === 'increment') {
                        item.quantity++;
                    } else if (action === 'decrement' && item.quantity > 1) {
                        item.quantity--;
                    }
                }

                sessionStorage.setItem("cart", JSON.stringify(newCart));
                renderCart();
                updateCartCount();
            });
        });

        cartItemsContainer.querySelectorAll('.remove-from-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                let newCart = cartItems.filter(item => item._id !== id);
                sessionStorage.setItem("cart", JSON.stringify(newCart));
                renderCart();
                updateCartCount();
            });
        });
        
        const getLocationBtn = document.getElementById('get-location-btn');
        if (getLocationBtn) {
            getLocationBtn.addEventListener('click', () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async position => {
                        const { latitude, longitude } = position.coords;
                        try {
                            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                            const data = await response.json();
                            document.getElementById('delivery-location').value = data.display_name;
                        } catch (error) {
                            console.error('Error fetching address:', error);
                            alert("Could not fetch address from location.");
                        }
                    }, error => {
                        console.error('Geolocation error:', error);
                        alert("Geolocation is not enabled or permission denied.");
                    });
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
            });
        }

        const bookOrderBtn = document.getElementById('book-order-btn');
        if (bookOrderBtn) {
            bookOrderBtn.addEventListener('click', () => {
                const address = document.getElementById('delivery-location').value.trim();
                const selectedPaymentMethodElement = document.querySelector('input[name="payment-method"]:checked');
                if (cartItems.length === 0) {
                    alert("Your cart is empty!");
                    return;
                }
                if (!address) {
                    alert("Please enter a delivery address.");
                    return;
                }

                if (!selectedPaymentMethodElement) {
                    alert("Please select a payment method.");
                    return;
                }

                const selectedPaymentMethod = selectedPaymentMethodElement.value;
                const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                const orderDetails = {
                    cart: cartItems,
                    address: address,
                    paymentMethod: selectedPaymentMethod,
                    total: total,
                    date: new Date().toISOString()
                };

                console.log("Booking Order:", orderDetails);
                alert(`Order successfully booked! Total: ₹${total.toFixed(2)}. Payment via: ${selectedPaymentMethod.toUpperCase()}. Delivery to: ${address}`);

                const existingOrders = JSON.parse(sessionStorage.getItem("orders")) || [];

                existingOrders.push(orderDetails);

                sessionStorage.setItem("orders", JSON.stringify(existingOrders));
                
                sessionStorage.removeItem("cart");
                history.pushState(null, "", "/home");
                renderContent("/home");
            });
        }
    };

    renderCart();
};

export default cart;