import home  from "./home.js"
let addProduct = () => {
  return `
  <div class="registerForm">
        <form action="" >
            <div>
                <h1>Add Products</h1>
            </div>
        
            <div>
                <input type="text" name="title" placeholder="Title">
                <i class="fa-solid fa-heading"></i>
            </div>
            <div>
                <input type="number" name="price" placeholder="price">
                <i class="fa-solid fa-hand-holding-dollar"></i>
            </div>
            
            <div class="category-section">
                <select name="category">
                        <option value="selectCategory" selected disabled >Select category</option>
                        <option value="electronics" >Electronics</option>
                        <option value="mensWear" >Mens Wear</option>
                        <option value="womensWear" >Womens wear</option>
                        <option value="kids" >Kids</option>
                </select>
            </div>
            <div>
                <textarea name="description" placeholder="Type Description of a Product"></textarea>
                <i class="fa-solid fa-audio-description"></i>
            </div>

            <div class="removeBorder">
                <input type="file" accept=".jpg, .png, .jpeg" name="image">
            </div>
        </form>
    </div>
    
    `
}


export let handleProductBind=()=>{
    let state={
  setState(name, value){
    this[name] = value
  } 
}

const inputs = document.querySelectorAll("input");
const form = document.querySelector("form");
const textArea = document.querySelector("textarea");
const select = document.querySelector("select");

function handleChange(e){
  let {name,value,files}=e.target
  if(name=="image"){
    value=files[0]
    const reader=new FileReader()
    reader.onload=function(){
      form.style.backgroundSize = "100% 100%";
      form.style.transform = "rotateY(180deg)";
      
      setTimeout(()=>{
      form.style.backgroundImage=`url(${reader.result})`
        form.style.justifyContent = "end";
        inputs.forEach((inp)=>{
        inp.parentElement.style.display = "none";
      });
      form.innerHTML = `
      <div>
        <button style="transform:rotateY(180deg)">Submit</button>
      </div>
      
      `
      const btn = document.querySelector("button");
        console.log(btn)
        btn.addEventListener("click",design)
      },1000)

    }
    reader.readAsDataURL(value)
    state.setState(name,value)
      }else{
        state.setState(name,value)
      }
}

function handleSubmit(e){
  e.preventDefault()
  let {title,category,image,price,description}=state

  let payload={title,category,image,price,description}
  console.log(payload);
  let formData=new FormData()
  for(let data in payload){
  formData.append(data,payload[data])
};

(async()=>{
try {
    let res=await fetch("http://localhost:5000/api/products/add",{
    method:"POST",
    body:formData
  })
  console.log(res);
  let data=await res.json()
  if(res.status==201){
  alert(`${data.message}`)
  history.pushState({},"","home")
  root.innerHTML = home()
  }else{
    alert("Something went wrong")
  }

} catch (error) {
  console.log(error);
  alert("Something went wrong")
}

})();
}

select.addEventListener("change", handleChange)
form.addEventListener('submit',handleSubmit)
inputs.forEach(input=>{
  input.addEventListener('change', handleChange)
})
textArea.addEventListener('change', handleChange)

const design = ()=>{
  const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ["star"],
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ["circle"],
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);

}

}

export default addProduct
