import { useState } from "react";
import { verify } from "jsonwebtoken";


const Dashbord = ({result}) => {

  const[name , setName] = useState("");
  const[lastName , setLastName] = useState("");
  const[password , setPassword] = useState("");

  const submitHandler = async ()=>{

    const res = await fetch("/api/auth/update-info" , {
      method : "POST",
      body : JSON.stringify({name , lastName , password}),
      headers : {'Content-type': 'application/json'} 
    });

    const data = await res.json();
  }



  return (
    <div>
      <h3>Dashbord</h3>
      <p>Your email is {result.email}</p>
      <h2>Completed Your Profile  </h2>
      <input placeholder="Name" type="text" value={name} onChange={e => setName(e.target.value)} />
      <br/>
      <input placeholder="Last Name" type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
      <br/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br/>
      <button onClick={submitHandler}>Submit</button>
    </div>
  )
}

export default Dashbord

export async function getServerSideProps(context){

  const {token} = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const result = verify(token , secretKey);
  if(!result){
    return {
      redirect : {destination : "/signin" , permanent : false}
    }
  }

  return {
    props :{result}
  }
}