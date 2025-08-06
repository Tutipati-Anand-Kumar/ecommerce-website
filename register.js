import renderContent from "./index.js"

const register = () => {
    return `
    <div class="form-container">
        <form class="register-form">
            <h2>Register</h2>
            
            <div class="form-group">
                <input type="text" name="name" placeholder="Name">
                <span><i class="fa-solid fa-signature"></i></span>
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="email">
                <span><i class="fa-solid fa-envelope"></i></span>
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="password" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%&*])[A-Za-z\\d!@#$%&*]{8,}$">
                <span><i class="fa-solid fa-key"></i></span>
            </div>
            <div class="form-group">
                <input type="password" name="re-password" placeholder="re-password">
                <span><i class="fa-solid fa-repeat"></i></span>
            </div>
            <div class="form-group">
                <textarea name="address" placeholder="address"></textarea>
                <span><i class="fa-solid fa-location-dot"></i></span>
            </div>
            <div class="form-group file-input-group">
                <input type="file" accept=".jpg, .png, .jpeg" name="profileImage">
            </div>

            <div class="form-actions">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
    `;
};

export const handleRegisterBind = () => {
    const form = document.querySelector('.register-form');
    const inputs = form.querySelectorAll('input');
    const textArea = form.querySelector('textarea');
    
    const state = {
        setState(name, value) {
            this[name] = value;
        }
    };
    
    function handleChange(e) {
        let { name, value, files } = e.target;
        if (name === "profileImage") {
            state[name] = files[0];
            const reader = new FileReader();
            reader.onload = function () {
                form.style.backgroundImage = `url(${reader.result})`;
                form.style.backgroundSize = "cover";
            };
            reader.readAsDataURL(files[0]);
        } else {
            state[name] = value;
        }
    }

    function checkPassword(e) {
        let { name, value } = e.target;
        if (name === "re-password") {
            const parentElement = e.target.parentElement;
            if (state.password !== value) {
                parentElement.style.borderBottom = "2px solid red";
            } else {
                parentElement.style.borderBottom = "2px solid #ccc";
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let { name, email, password, address, profileImage } = state;
        if (!name || !email || !password || !address || !profileImage) {
            alert("All fields are mandatory");
            return;
        }
        if (password !== state["re-password"]) {
            alert("Password and re-password should match");
            return;
        }

        let formData = new FormData();
        for (let key in state) {
            formData.append(key, state[key]);
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (res.status === 201) {
                alert(data.message);
                history.pushState({}, "", "/home");
                renderContent("/home");
            } else {
                alert(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            alert("Something went wrong with the registration request.");
        }
    }

    form.addEventListener('submit', handleSubmit);
    inputs.forEach(input => {
        input.addEventListener('change', handleChange);
        if (input.name === "re-password") {
            input.addEventListener('input', checkPassword);
        }
    });
    textArea.addEventListener('change', handleChange);
};

export default register;