const register = () =>{
    return `
    <div class="registerForm">
        <form action="">
            <div>
                <h1>Register</h1>
            </div>
                <div>
                    <input type="text" name="name" placeholder="Name">
                    <span><i class="fa-solid fa-signature"></i></span>
                </div>

                 <div>
                    <input type="email" name="email" placeholder="Email">
                    <span><i class="fa-solid fa-envelope"></i></span>
                </div>

                 <div>
                    <input type="password" name="password" placeholder="Password">
                    <span><i class="fa-solid fa-lock"></i></span>
                </div>

                 <div>
                    <input type="password" name="Re-Password" placeholder="Re enter Password" >
                    <span><i class="fa-solid fa-key"></i></span>
                </div> 

                <div>
                    <textarea name="address" placeholder="Address" ></textarea>
                    <span><i class="fa-solid fa-location-dot"></i></span>
                </div>

                <div>
                    <input type="file" accept=".png, .jpg, .jpeg" name = "image">
                </div>
                <div >
                 <button type="submit">Submit</button>
                </div>
                
        </form>
</div>
    `
}

export default register