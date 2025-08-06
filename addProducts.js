import home, { updateCartCount } from "./home.js";
import renderContent from "./index.js"

let addProduct = () => {
    return `
        <div class="form-container">
            <form class="add-product-form">
                <h2>Add Product</h2>
                <div class="form-group">
                    <input type="text" name="title" placeholder="Product Title" required>
                    <i class="fa-solid fa-heading"></i>
                </div>
                <div class="form-group">
                    <input type="number" name="price" placeholder="Product Price" min="1" required>
                    <i class="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div class="form-group">
                    <select name="category" required>
                        <option value="" disabled selected>Select category</option>
                        <option value="electronics">Electronics</option>
                        <option value="mensWear">Mens Wear</option>
                        <option value="womensWear">Womens wear</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>
                <div class="form-group">
                    <textarea name="description" placeholder="Product Description" required></textarea>
                    <i class="fa-solid fa-audio-description"></i>
                </div>
                <div class="form-group file-input-group">
                    <label for="product-image">Product Image:</label>
                    <input type="file" id="product-image" accept=".jpg, .png, .jpeg" name="image" required>
                </div>
                <div class="form-actions">
                    <button type="submit" id="add-product-submit">Submit</button>
                </div>
            </form>
        </div>
    `;
};

export const handleProductBind = () => {
    const root = document.getElementById('root');
    const form = document.querySelector('.add-product-form');
    const h2 = document.querySelector("h2")
    const btn = document.querySelector("#add-product-submit")

    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    let state = {};

   const handleChange = (e) => {
    let { name, value, files } = e.target;

    if (name === "image") {
        const file = files ? files[0] : null;
        if (!file) return;
        const reader = new FileReader();

        reader.onload = function () {
            form.style.backgroundSize = "100% 100%";
            form.style.transform = "rotateY(180deg)";
            btn.style.transform = "rotatey(180deg)";

            setTimeout(() => {
                form.style.backgroundImage = `url(${reader.result})`;
                form.style.justifyContent = "flex-end"; // Align content to the bottom-right
                form.style.minHeight = "450px";
                form.style.minWidth = "400px";
                btn.style.width = "auto";
                h2.style.display = "none";

                inputs.forEach((inp) => {
                     inp.removeAttribute("required"); 
                    if (inp.parentElement) {
                        inp.parentElement.style.display = "none";
                    }
                });
            }, 1000);
        };

        reader.readAsDataURL(file);
        state[name] = file;
        e.target.value = null; 
    } else {
        state[name] = value;
    }
};
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, category, image, price, description } = state;
        if (!title || !category || !image || !price || !description) {
            alert("All fields are mandatory.");
            return;
        }

        const formData = new FormData();
        for (const key in state) {
            formData.append(key, state[key]);
        }

        try {
            const res = await fetch("http://localhost:5000/api/products/add", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (res.status === 201) {
                alert(data.message);
                designConfetti();
                updateCartCount();

                setTimeout(() => {
                    history.pushState(null, "", "/home");
                    renderContent("/home");
                }, 3000);
            } else {
                alert(`Error: ${data.message || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong with the request.");
        }
    };

    const designConfetti = () => {
        const defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            shapes: ["star"],
            colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"]
        };

        function shoot() {
            confetti({ ...defaults, particleCount: 40, scalar: 1.2, shapes: ["star"] });
            confetti({ ...defaults, particleCount: 10, scalar: 0.75, shapes: ["circle"] });
        }

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
    };

    inputs.forEach(input => input.addEventListener('change', handleChange));
    form.addEventListener('submit', handleSubmit);
};

export default addProduct;
