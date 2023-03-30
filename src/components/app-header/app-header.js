import React from 'react';
import NavItem from './nav-item/nav-item';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export const BURGER_CONSTRUCTOR = 'Конструктор';
export const ORDER_FEED = 'Лента заказов';
export const USER_ACCOUNT = 'Личный кабинет';

class AppHeader extends React.Component {
  state = {
    isActive: BURGER_CONSTRUCTOR,
  };

  handleNavBarSelect = (value) => {
    this.setState({ isActive: value });
  };

  render() {
    const { isActive } = this.state;
    return (
      <header className={`${styles.header} pb-4 pt-4`}>
        <nav className={styles.nav}>
          <div className={`${styles.itemContainer} ${styles.decorator1}`}>
            <NavItem
              option={BURGER_CONSTRUCTOR}
              onClick={this.handleNavBarSelect}
              isActive={isActive}
            />
            <NavItem
              option={ORDER_FEED}
              onClick={this.handleNavBarSelect}
              isActive={isActive}
            />
          </div>
          <div className={`${styles.itemContainer} ${styles.decorator2}`}>
            <Logo />
          </div>
          <div className={`${styles.itemContainer} ${styles.decorator3}`}>
            <NavItem
              option={USER_ACCOUNT}
              onClick={this.handleNavBarSelect}
              isActive={isActive}
            />
          </div>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
