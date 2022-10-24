import Link from 'next/link';
import styles from './../styles/Navbar.module.css';

const NavBar = () => {
  return (
    <nav>
      <ul className={styles.nav}>
        <Link className={styles.logo} href="/"><li className={styles.logo}>Brutunus</li></Link>
        <li><Link href="/datalist">Full List</Link></li>
        <li><Link href="/">Statistics</Link></li>
        <li><Link href="/create">Create</Link></li>
        <li><Link href="/#">Map</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar;