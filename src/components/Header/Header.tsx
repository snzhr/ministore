import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/products">MiniStore</Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/cart" className={styles.link}>Cart</Link>
        <Link to="/profile" className={styles.link}>Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
