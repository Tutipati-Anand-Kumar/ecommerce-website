import login, { handleLoginBind } from "./login.js";
import register, { handleRegisterBind } from "./register.js";
import addProduct, { handleProductBind } from "./addProducts.js";
import home, { handleHomeBind, updateCartCount } from "./home.js";
import cart, { handleCartBind } from "./cart.js";
import orders, { handleOrdersBind } from "./orders.js";

const root = document.getElementById('root');
const mainHeader = document.querySelector('.main-header');
const allNavLinks = document.querySelectorAll('a[href^="/"]');
const top = document.getElementById("top");

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
    root.innerHTML = route.render();    
    if (route.bind) {
        route.bind();
    }
    
    const hideHeader = ["/login", "/register", "/addProduct"].includes(path);
    mainHeader.style.display = hideHeader ? 'none'  : 'flex';
    top.style.display = hideHeader ? 'none' : 'flex' ;

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

allNavLinks.forEach((anchor) => {
    anchor.addEventListener("click", handleClick);
});

window.addEventListener('popstate', () => {
    const path = location.pathname;
    renderContent(path);
});

document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname;
    renderContent(path);
});

root.addEventListener('click', handleClick);
export default renderContent;