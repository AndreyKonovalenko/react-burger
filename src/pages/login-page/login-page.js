import { Link } from 'react-router-dom';
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

import { getLoginFormState } from '../../services/auth/auth-selectors';
import { setLoginFromValue } from '../../services/auth/auth-actions';
import { useCallback } from 'react';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector(getLoginFormState);

  const onChange = useCallback(
    (e) => {
      dispatch(
        setLoginFromValue({ field: e.target.name, value: e.target.value })
      );
    },
    [dispatch]
  );
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <p className='text text_type_main-medium'>{ENTER}</p>
          <EmailInput
            onChange={onChange}
            value={email}
            name={'email'}
            placeholder='E-mail'
          />
          <PasswordInput
            onChange={onChange}
            value={password}
            name={'password'}
          />
          <Button> {LOGIN}</Button>
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
    </div>
  );
};

export default LoginPage;
