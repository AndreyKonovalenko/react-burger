import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { typedUseDispatch } from '../../services/storeTypes';
import { useForm } from '../../components/hooks/use-form';
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
import ErrorBage from '../../components/error-bage/error-bage';
import { getAuthState, getFormState } from '../../services/auth/auth-selectors';
import { login, clearForm, clearError } from '../../services/auth/auth-actions';

const LoginPage = (): JSX.Element => {
  const dispatch = typedUseDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = useForm();
  const { email, password } = useSelector(getFormState);
  const { loading, user, error } = useSelector(getAuthState);

  const onLogIn = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(login());
    },
    [dispatch]
  );

  useEffect(() => {
    if (user) {
      dispatch(clearForm());
      navigate(location?.state?.from || '/');
    }
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, navigate, user, location]);

  const content = (
    <div className={styles.formContainer}>
      <form onSubmit={onLogIn} className={styles.form}>
        <p className='text text_type_main-medium'>{ENTER}</p>
        <EmailInput
          onChange={handleChange}
          value={email}
          name={'email'}
          placeholder='E-mail'
        />
        <PasswordInput
          onChange={handleChange}
          value={password}
          name={'password'}
        />
        <Button htmlType='submit' type='primary' size='medium'>
          {LOGIN}
        </Button>
      </form>
      <div className={styles.linkContainer}>
        <span className='text text_type_main-default text_color_inactive'>
          Вы - новй пользователь?{' '}
          <Link className={styles.link} to='/register'>
            {REGISTER}
          </Link>
        </span>
        <span className='text text_type_main-default text_color_inactive'>
          Забыли пароль?{' '}
          <Link className={styles.link} to='/forgot-password'>
            {RESTORE_PASSWORD}
          </Link>
        </span>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {Boolean(error) && <ErrorBage error={error} />}
      {loading ? <LoadingBage /> : content}
    </div>
  );
};

export default LoginPage;
