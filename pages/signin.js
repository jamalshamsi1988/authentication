import { useState } from "react";


function SignIn(){
    const [email , setEmail]=useState("");
    const [password , setPassword]=useState("");

    const signInHandler= async () =>{
        const res = await fetch("/api/auth/signin" , {
            method : "POST",
            body:JSON.stringify({email , password}),
            headers: {'Content-type': 'application/json'},
        });
        const data = await res.json();
        console.log(data)
    }

  return (
    <div>
        <h3>Login</h3>
        <input type='text' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={signInHandler}>Sign In</button>
    </div>
  )
}

export default SignIn
