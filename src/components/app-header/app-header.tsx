import NavItem from './nav-item/nav-item';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { BURGER_CONSTRUCTOR, ORDER_FEED, USER_ACCOUNT } from '../../utils/ui-constants';

const AppHeader = (): JSX.Element => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <div className={`${styles.itemContainer} ${styles.decorator1}`}>
        <NavItem option={BURGER_CONSTRUCTOR} to='/' />
        <NavItem option={ORDER_FEED} to='/orders-feed' />
      </div>
      <div className={`${styles.itemContainer} ${styles.decorator2}`}>
        <Logo />
      </div>
      <div className={`${styles.itemContainer} ${styles.decorator3}`}>
        <NavItem option={USER_ACCOUNT} to='/profile' />
      </div>
    </nav>
  </header>
);

export default AppHeader;
