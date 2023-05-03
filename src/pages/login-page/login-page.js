import { Link, Navigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './login-page.module.css';
import {
  LOGIN,
  ENTER,
  REGISTER,
  RESTORE_PASSWORD,
} from '../../utils/ui-constants';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import LoadingBage from '../../components/loading-bage/loading-bage';
import {
  getAuthState,
  getLoginFormState,
  getUserState,
} from '../../services/auth/auth-selectors';
import { setLoginFromValue, login } from '../../services/auth/auth-actions';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector(getLoginFormState);
  const user = useSelector(getUserState);
  const { loading } = useSelector(getAuthState);

  const onChange = useCallback(
    (e) => {
      dispatch(
        setLoginFromValue({ field: e.target.name, value: e.target.value })
      );
    },
    [dispatch]
  );
  const onLogIn = useCallback(() => {
    dispatch(login());
  }, [dispatch]);

  if (user) {
    return <Navigate to='/profile' />;
  }

  const content = (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <p className='text text_type_main-medium'>{ENTER}</p>
        <EmailInput
          onChange={onChange}
          value={email}
          name={'email'}
          placeholder='E-mail'
        />
        <PasswordInput onChange={onChange} value={password} name={'password'} />
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={onLogIn}>
          {LOGIN}
        </Button>
      </div>
      <div className={styles.linkContainer}>
        <span className='text text_type_main-default text_color_inactive'>
          Вы - новй пользователь?{' '}
          <Link className={styles.link} to='register'>
            {REGISTER}
          </Link>
        </span>
        <span className='text text_type_main-default text_color_inactive'>
          Забыли пароль?{' '}
          <Link className={styles.link} to='forget-password'>
            {RESTORE_PASSWORD}
          </Link>
        </span>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {loading ? <LoadingBage /> : content}
    </div>
  );
};

export default LoginPage;
