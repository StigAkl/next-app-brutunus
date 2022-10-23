import Link from 'next/link';
import styled from 'styled-components'
import styles from './../styles/Navbar.module.css';

const NavBar = () => {
  return (
    <nav>
      <ul className={styles.nav}>
        <li><Link href="/">Statistics</Link></li>
        <li><Link href="/datalist">Complete List</Link></li>
        <li><Link href="/map">Map</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar;