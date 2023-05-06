import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
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
import ErrorBage from '../../components/error-bage/error-bage';
import { getAuthState, getFormState } from '../../services/auth/auth-selectors';
import {
  setFormValue,
  login,
  clearForm,
} from '../../services/auth/auth-actions';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = useSelector(getFormState);
  const { loading, user, error } = useSelector(getAuthState);

  const onChange = useCallback(
    (e) => {
      dispatch(setFormValue({ field: e.target.name, value: e.target.value }));
    },
    [dispatch]
  );
  const onLogIn = useCallback(() => {
    dispatch(login());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(clearForm());
      navigate('/');
    }
  }, [dispatch, navigate, user]);

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
