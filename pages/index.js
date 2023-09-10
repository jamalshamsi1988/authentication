import  Link  from 'next/link';

import styles from '../styles/Home.module.css'

 function Home() {
  return (
    <div className={styles.container}>
      <button><Link href="/signup">Sign up</Link></button>
    </div>
  )
}
export default Home;