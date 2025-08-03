import addProduct, { handleProductBind } from "./addProducts.js";

let home = () => {
    setTimeout(() => {
        let anchor = document.querySelector('#add');
        const handelClickAnchor = (e) => {
            e.preventDefault();
            history.pushState({}, "", e.target.pathname);
            root.innerHTML=addProduct();handleProductBind()
        };
        if (anchor) {
            anchor.addEventListener("click", handelClickAnchor);
        }
    });
    
    try{
        let inp = document.querySelector(".inp");
        let input = document.querySelector("input");
        let prod = document.querySelector(".products");
        let allProducts = [];
        inp.style.display = "flex";
        prod.style.display = "flex";
        root.style.display = "none";

        async function Getdata() {
            // let data=await fetch("https://fakestoreapi.com/products");
            let data=await fetch("http://localhost:5000/api/products/all");
            let jsonData= await data.json();
            allProducts = jsonData;
            console.log(allProducts);
            displayproducts(allProducts);
        }

        function displayproducts(products){
                    prod.innerHTML='';
                    products.forEach((ele)=>{
                        prod.innerHTML+=`<div class="container">
                        <div class="photo"><img src="${ele.image}" alt="" class="img"></div>
                        <div class="item"><p class="p1">${ele.title}</p>
                        <p class="p2">&dollar; ${ele.price}</p>
                        <div class="description">${ele.description}</div>
                        <input class="cat" placeholder="${ele.category}"></input></div>
                        <div class="btn"><button>Add to Cart</button></div>
                    </div>`
                    }); 
            }
        input.addEventListener("input", (e)=>{
            let val = e.target.value.toLowerCase();
            let filtered = allProducts.filter((item) =>
            item.title.toLowerCase().includes(val)
            );
            displayproducts(filtered);
        });
                
        Getdata()
    }catch (error){
            console.log(error)
        }
    
    return `
        <h1>Home</h1>
        <a href="/addProduct" id="add">Add products</a>
    `;
    
};

export default home;