import React from 'react';
import NavItem from './nav-item/nav-item';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export const BURGER_CONSTRUCTOR = 'Конструктор';
export const ORDER_FEED = 'Лента заказов';
export const USER_ACCOUNT = 'Личный кабинет';

class AppHeader extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={`${styles.itemContainer} ${styles.decorator1}`}>
            <NavItem
              option={BURGER_CONSTRUCTOR}
              onClick={() => {}}
              isActive={true}
            />
            <NavItem option={ORDER_FEED} onClick={() => {}} isActive={false} />
          </div>
          <div className={`${styles.itemContainer} ${styles.decorator2}`}>
            <Logo />
          </div>
          <div className={`${styles.itemContainer} ${styles.decorator3}`}>
            <NavItem
              option={USER_ACCOUNT}
              onClick={() => {}}
              isActive={false}
            />
          </div>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
