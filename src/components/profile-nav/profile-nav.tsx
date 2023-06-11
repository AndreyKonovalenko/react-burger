import { useCallback } from 'react';
import { typedUseDispatch } from '../../services/storeTypes';
import { NavLink } from 'react-router-dom';
import styles from './profile-nav.module.css';
import { PROFILE, ORDER_HISTORY, EXIT } from '../../utils/ui-constants';
import { TO_PROFILE, TO_ORDERS } from '../../utils/route-constants';
import { logout, clearState } from '../../services/auth/auth-actions';
import { deleteCookie } from '../../utils/burger-api';

const ProfileNav = () => {
  const dispatch = typedUseDispatch();
  const onLogout = useCallback(() => {
    dispatch(logout());
    dispatch(clearState());
    sessionStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  }, [dispatch]);

  return (
    <div className={styles.navContainer}>
      <div className={styles.nav}>
        <NavLink className={styles.navItem} to={TO_PROFILE} end>
          {({ isActive }) => (
            <p
              className={
                isActive
                  ? 'text text_type_main-medium'
                  : 'text text_type_main-medium text_color_inactive'
              }>
              {PROFILE}
            </p>
          )}
        </NavLink>
        <NavLink className={styles.navItem} to={`${TO_PROFILE}${TO_ORDERS}`}>
          {({ isActive }) => (
            <p
              className={
                isActive
                  ? 'text text_type_main-medium'
                  : 'text text_type_main-medium text_color_inactive'
              }>
              {ORDER_HISTORY}
            </p>
          )}
        </NavLink>
        <NavLink className={styles.navItem} onClick={onLogout} to='/'>
          {({ isActive }) => (
            <p
              className={
                isActive
                  ? 'text text_type_main-medium'
                  : 'text text_type_main-medium text_color_inactive'
              }>
              {EXIT}
            </p>
          )}
        </NavLink>
      </div>
      <div className={styles.textContaienr}>
        <span className='text text_type_main-default text_color_inactive'>
          В этом разделе вы может изменить свои персональные данные
        </span>
      </div>
    </div>
  );
};

export default ProfileNav;
