import  Link  from 'next/link';

import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

 function Home() {
  const [isLogedIn , setIsLogedIn]=useState(false);

  useEffect(()=>{
    fetch("/api/user").then(res => res.json()).then(data =>{
      if(res.status === "success") setIsLogedIn(true);
    })
  },[])

  const logeOutHandler = async ()=>{
    const res = await fetch("/api/auth/signout");
    const data = await res.json();
    if(data.status === "success") isLogedIn(false);
  }
  return (
    <div className={styles.container}>
        {
          isLogedIn ? (
          <>
              <button><Link href="/dashbord">Dashbord</Link></button>
              <button onClick={logeOutHandler}>Loge Out</button>
          </> ) : null
        }

        {
          !isLogedIn ? (
          <>
          <button><Link href="/signup">Sign Up</Link></button>
           <button><Link href="/signin">Sign In</Link></button>
          </>) : null
        }
   
      
    </div>
  )
}
export default Home;