import { NavLink, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile-page.module.css';
import { SAVE, PROFILE, ORDER_HISTORY, EXIT } from '../../utils/ui-constants';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import LoadingBage from '../../components/loading-bage/loading-bage';
import { getAuthState, getFormState } from '../../services/auth/auth-selectors';
import {
  clearMessage,
  setFormValue,
  updateUserData,
  logout,
  clearState,
} from '../../services/auth/auth-actions';
import ErrorBage from '../../components/error-bage/error-bage';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, email, password } = useSelector(getFormState);
  const { loading, message, error } = useSelector(getAuthState);

  const onChange = useCallback(
    (e) => {
      dispatch(setFormValue({ field: e.target.name, value: e.target.value }));
    },
    [dispatch]
  );
  const onSave = useCallback(() => {
    dispatch(updateUserData());
  }, [dispatch]);

  const onLogout = useCallback(() => {
    dispatch(logout());
    dispatch(clearState());
  });

  useEffect(() => {
    return () => Boolean(message) && dispatch(clearMessage());
  }, [message, navigate, dispatch]);

  const content = (
    <div className={styles.wrapper}>
      <div className={styles.navContainer}>
        <div className={styles.nav}>
          <NavLink className={styles.navItem} to='/profile' end>
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
          <NavLink className={styles.navItem} to='profile/orders' end>
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

      <div className={styles.form}>
        <Input
          onChange={onChange}
          value={name}
          name={'name'}
          placeholder='Имя'
        />
        <EmailInput
          onChange={onChange}
          value={email}
          name={'email'}
          placeholder='E-mail'
        />
        <PasswordInput onChange={onChange} value={password} name={'password'} />
        <Button htmlType='button' type='primary' size='medium' onClick={onSave}>
          {SAVE}
        </Button>
      </div>
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
