import { useState } from "react";


function SignUp(){
    const [email , setEmail]=useState("");
    const [password , setPassword]=useState("");

    const signupHandler= async () =>{
        const res = await fetch("/api/auth/signup" , {
            method : "POST",
            body:JSON.stringify({email , password}),
            headers: {'Content-type': 'application/json'},
        });
        const data = await res.json();
        console.log(data)
    }

  return (
    <div>
        <input type='text' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={signupHandler}>Sign Up</button>
    </div>
  )
}

export default SignUp
