import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { typedUseDispatch } from '../../services/storeTypes';
import styles from './profile-page.module.css';

import LoadingBage from '../../components/loading-bage/loading-bage';
import { getAuthState } from '../../services/auth/auth-selectors';
import { clearMessage } from '../../services/auth/auth-actions';
import ErrorBage from '../../components/error-bage/error-bage';
import ProfileNav from '../../components/profile-nav/profile-nav';
import { conntectToAUser, disconnect } from '../../services/ws/ws-actions';
import { getCookie } from '../../utils/burger-api';

const ProfilePage = (): JSX.Element => {
  const dispatch = typedUseDispatch();
  const { loading, message, error } = useSelector(getAuthState);

  useEffect(() => {
    return () => {
      Boolean(message) && dispatch(clearMessage());
    };
  }, [message, dispatch]);

  useEffect(() => {
    const token = getCookie('accessToken');
    if (Boolean(token)) {
      dispatch(conntectToAUser(token!));
    }
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const content = (
    <div className={styles.wrapper}>
      <ProfileNav />
      <Outlet />
    </div>
  );

  return (
    <div className={styles.container}>
      {Boolean(error) && <ErrorBage error={error} />}
      {Boolean(message) && (
        <p className='text text_type_main-medium mb-6'>{message}</p>
      )}
      {loading ? <LoadingBage /> : content}
    </div>
  );
};

export default ProfilePage;
