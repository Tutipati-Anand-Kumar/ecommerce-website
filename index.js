import login from './login.js'
import register from './register.js';
const root = document.getElementById("root")
//console.log(root)
const Anchors = document.querySelectorAll("a");

const router = {
    '/login':login,
    '/register':register
}
function handleClick(e){
    e.preventDefault()
    let path = e.target.pathname
    // console.log(path)
    history.pushState(null, "", `${path}`)
    root.innerHTML = router[path]()
}

Anchors.forEach((anchor)=>{
    anchor.addEventListener('click',handleClick)
})

window.addEventListener('popstate', (e)=>{
    // console.log(e.target)
    console.log(location)
    let path = location.pathname
    if (path == "/index.html"){
        root.innerHTML=""
    }else{
    root.innerHTML = router[path]()
    }

})

const State = {
    setState(name, value){
        this[name] = value 
    }
}

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const textArea = document.querySelector("textarea");


function handleChage(e){
    let {name, value, files} = e.target
    if (name != "re-password"){
        if (name== "image"){
            value = files[0]
   
      value = e.target.files[0];
      if (value instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function () {
        form.style.backgroundImage = `url(${reader.result})`
        };
        reader.readAsDataURL(value);
      } else {
        console.log("No valid file selected.");
      }
            State.setState(name, value)
        }else{
            State.setState(name, value)
        }
    }
}

function handleSubmit(e){
    e.preventDefault()
    console.log(State)
}

form.addEventListener("submit", handleSubmit)
inputs.forEach((input)=>{
    input.addEventListener("change",handleChage)
    
})
textArea.addEventListener("change", handleChage)