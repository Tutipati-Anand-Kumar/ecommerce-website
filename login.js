import home, { handleHomeBind, updateCartCount } from "./home.js";
import renderContent from "./index.js"
const login = () => {
    return `
    <div class="form-container">
        <form class="login-form">
            <h2>Login</h2>
            
            <div class="form-group">
                <input type="email" name="email" placeholder="email">
                <span><i class="fa-solid fa-envelope"></i></span>
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="password">
                <span><i class="fa-solid fa-key"></i></span>
            </div>

            <div class="form-actions">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
    `;
};

export const handleLoginBind = () => {
    const form = document.querySelector('.login-form');
    const inputs = form.querySelectorAll('input');
    const root = document.getElementById("root");

    const state = {
        setState(name, value) {
            this[name] = value;
        }
    };
    
    function handleChange(e) {
        let { name, value } = e.target;
        state.setState(name, value);        
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let { email, password } = state;
        
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            
            if (res.status === 200) {
                alert(data.message);
                history.pushState({}, "", "/home");
                renderContent("/home");
            } else {
                alert(data.message || "Login failed.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Something went wrong with the login request.");
        }
    }

    inputs.forEach(input => {
        input.addEventListener('change', handleChange);
    });
    form.addEventListener('submit', handleSubmit);
};

export default login;