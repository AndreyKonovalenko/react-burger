import React from 'react';
import NavItem from './nav-item/nav-item';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export const BURGER_CONSTRUCTOR = 'Конструктор';
export const ORDER_FEED = 'Лента заказов';
export const USER_ACCOUNT = 'Личный кабинет';

const AppHeader = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <div className={`${styles.itemContainer} ${styles.decorator1}`}>
        <NavItem option={BURGER_CONSTRUCTOR} to='/' />
        <NavItem option={ORDER_FEED} to='/orders' />
      </div>
      <div className={`${styles.itemContainer} ${styles.decorator2}`}>
        <Logo />
      </div>
      <div className={`${styles.itemContainer} ${styles.decorator3}`}>
        <NavItem option={USER_ACCOUNT} to='/login' />
      </div>
    </nav>
  </header>
);

export default AppHeader;
