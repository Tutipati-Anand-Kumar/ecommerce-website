import login, { handleLoginBind } from "./login.js";
import register, { handleRegisterBind } from "./register.js";
import addProduct, { handleProductBind } from "./addProducts.js";
import home, { handleHomeBind, updateCartCount } from "./home.js";
import cart, { handleCartBind } from "./cart.js";
import orders, { handleOrdersBind } from "./orders.js";

const root = document.getElementById('root');
const mainHeader = document.querySelector('.main-header');
const allNavLinks = document.querySelectorAll('a[href^="/"]');

const router = {
    "/": { render: home, bind: handleHomeBind },
    "/home": { render: home, bind: handleHomeBind },
    "/login": { render: login, bind: handleLoginBind },
    "/register": { render: register, bind: handleRegisterBind },
    "/addProduct": { render: addProduct, bind: handleProductBind },
    "/cart": { render: cart, bind: handleCartBind },
    "/orders": { render: orders, bind: handleOrdersBind },
};

function renderContent(path) {
    const route = router[path] || router["/"];
    
    // Clear root content and render new page
    root.innerHTML = route.render();    
    // Bind event listeners if the function exists
    if (route.bind) {
        route.bind();
    }
    
    // Hide header elements on certain pages
    const hideHeader = ["/login", "/register", "/addProduct"].includes(path);
    mainHeader.style.display = hideHeader ? 'none'  : 'flex';

    // Update cart count on every page render
    updateCartCount();
}

function handleClick(e) {
    const target = e.target.closest('a[href^="/"]');
    if (!target) return;
    
    e.preventDefault();
    const path = target.getAttribute('href');
    history.pushState(null, "", path);
    renderContent(path);
}

// Attach event listeners to all relevant anchor tags
allNavLinks.forEach((anchor) => {
    anchor.addEventListener("click", handleClick);
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const path = location.pathname;
    renderContent(path);
});

// Initial page load
document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname;
    renderContent(path);
});

// Handle click events on dynamically added anchor tags within the root
root.addEventListener('click', handleClick);
export default renderContent;