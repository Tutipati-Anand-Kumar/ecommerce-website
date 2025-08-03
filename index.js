import login, { handleLoginBind } from "./login.js"
import register, { handleRegisterBind } from "./register.js"
import addProduct, { handleProductBind }  from "./addProducts.js";

const root=document.getElementById('root')
const allAnchors=document.querySelectorAll('a')

const router={
    "/login":[login, handleLoginBind],
    "/register":[register, handleRegisterBind],
    "/addProduct":[addProduct,handleProductBind]
}

function handleClick(e){
  e.preventDefault()
//   console.log(e.target.pathname);
let path=e.target.pathname
  history.pushState(null,"",`${path}`)
root.innerHTML=router[path][0]()
if(router[path][1]){
   router[path][1]()
}
}
allAnchors.forEach((anchor)=>{
    anchor.addEventListener("click",handleClick)
})

window.addEventListener('popstate',(e)=>{
  // console.log(location);
  let path=location.pathname
  // console.log(path);
  
if(path=="/index.html"){
root.innerHTML=""
}else{
  root.innerHTML=router[path][0]()
 if( router[path][1]){
   router[path][1]()
 }
}
  
})
