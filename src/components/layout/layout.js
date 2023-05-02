import styles from "./layout.module.css";
import { Outlet } from "react-router-dom";
import AppHeader from "../app-header/app-header";

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
