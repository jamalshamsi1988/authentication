import  Link  from 'next/link';

import styles from '../styles/Home.module.css'

 function Home() {

  const logeOutHandler = async ()=>{
    const res = await fetch("/api/auth/signout");
    const data = await res.json();
    console.log(data)
  }
  return (
    <div className={styles.container}>
       <button><Link href="/dashbord">Dashbord</Link></button>
      <button><Link href="/signup">Sign Up</Link></button>
      <button><Link href="/signin">Sign In</Link></button>
      <button onClick={logeOutHandler}>Loge Out</button>
    </div>
  )
}
export default Home;