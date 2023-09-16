import { useRouter } from "next/router";
import { useEffect, useState } from "react";


function SignUp(){
    const [email , setEmail]=useState("");
    const [password , setPassword]=useState("");
    const router = useRouter();

    useEffect(()=>{
      fetch("/api/user").then((res) => res.json()).then((data)=>{

            // if(data.status === "success") router.replace("/dashbord") 
            // This Way Is Better
            if(data.status === "success") window.location.href = "/dashbord" ;
      })
    },[])

    const signupHandler= async () =>{
        const res = await fetch("/api/auth/signup" , {
            method : "POST",
            body:JSON.stringify({email , password}),
            headers: {'Content-type': 'application/json'},
        });
        const data = await res.json();
        
        if(data.status === "success") router.push("/")
        console.log(data)
    }

  return (
    <div>
      <h3>Sign Up Form</h3>
        <input type='text' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={signupHandler}>Sign Up</button>
    </div>
  )
}

export default SignUp
