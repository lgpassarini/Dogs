import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Dogs from '../Assets/dogs.svg?react';
import { UserContext } from '../Contexts/UserContext';

const Header = () => {
  const { data, loggedIn, logout } = React.useContext(UserContext);
  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/">
          <Dogs />
        </Link>
        {loggedIn && data ? (
          <div className={styles.login}>
            <Link to="/conta">{data.nome}</Link>
          </div>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
