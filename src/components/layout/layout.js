import { Outlet } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import styles from './layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
