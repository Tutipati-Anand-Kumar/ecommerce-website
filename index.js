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