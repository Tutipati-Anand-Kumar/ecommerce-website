import renderContent from "./index.js";

const orders = () => {
    return `
        <div class="orders-page">
            <h2>Your Orders</h2>
            <div id="orders-list"></div>
        </div>
    `;
};

export const handleOrdersBind = () => {
    const ordersList = document.getElementById('orders-list');
    
    // 1. Retrieve the stored orders
    const storedOrders = JSON.parse(sessionStorage.getItem("orders")) || [];

    // 2. Check if there are any orders to display
    if (storedOrders.length === 0) {
        ordersList.innerHTML = `
            <p class="empty-cart-msg">You have no past orders.</p>
            <a href="/home" class="go-back-link">Continue Shopping</a>
        `;
        return; // Exit the function if no orders are found
    }

    // 3. Dynamically generate and display the orders
    ordersList.innerHTML = storedOrders.map(order => {
        const itemsHtml = order.cart.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.title}">
                <span>${item.title} x${item.quantity}</span>
            </div>
        `).join('');

        return `
            <div class="order-card">
                <h3>Order Placed on: ${new Date(order.date).toLocaleString()}</h3>
                <p>Total: ₹${order.total.toFixed(2)}</p>
                <p>Address: ${order.address}</p>
                <p>Payment Method: ${order.paymentMethod.toUpperCase()}</p>
                <div class="order-items">
                    <h4>Items:</h4>
                    ${itemsHtml}
                </div>
            </div>
        `;
    }).join('');
};

export default orders;