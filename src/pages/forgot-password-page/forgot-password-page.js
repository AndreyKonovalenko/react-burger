import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './forgot-password-page.module.css';
import { LOGIN, PASWORD_RESTORATION, RECOVER } from '../../utils/ui-constants';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import LoadingBage from '../../components/loading-bage/loading-bage';
import ErrorBage from '../../components/error-bage/error-bage';
import {
  getAuthError,
  getAuthState,
  getFormState,
} from '../../services/auth/auth-selectors';
import {
  setFormValue,
  rocoverPassword,
  clearMessage,
  clearError,
} from '../../services/auth/auth-actions';
import { TO_RESET_PASSWORD } from '../../utils/route-constants';

const ForgetPassowrdPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const error = useSelector(getAuthError);
  const { email } = useSelector(getFormState);
  const { loading, message, user } = useSelector(getAuthState);

  const onChange = useCallback(
    (e) => {
      dispatch(setFormValue({ field: e.target.name, value: e.target.value }));
    },
    [dispatch]
  );
  const onRecover = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(rocoverPassword());
    },
    [dispatch]
  );

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    if (message === 'Reset email sent') {
      navigate(TO_RESET_PASSWORD, { state: { from: pathname }, replace: true });
    }
    return () => {
      dispatch(clearError());
      Boolean(message) && dispatch(clearMessage());
    };
  }, [dispatch, navigate, message, user, pathname]);

  const content = (
    <div className={styles.formContainer}>
      <form onSubmit={onRecover} className={styles.form}>
        <p className='text text_type_main-medium'>{PASWORD_RESTORATION}</p>
        <EmailInput
          onChange={onChange}
          value={email}
          name={'email'}
          placeholder='E-mail'
        />
        <Button htmlType='submit' type='primary' size='medium'>
          {RECOVER}
        </Button>
      </form>
      <div>
        <span className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?{' '}
          <Link className={styles.link} to='/login'>
            {LOGIN}
          </Link>
        </span>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {Boolean(error) && <ErrorBage error={error} />}
      {message === 'Ошибка 500' && <ErrorBage error={message} />}
      {loading ? <LoadingBage /> : content}
    </div>
  );
};

export default ForgetPassowrdPage;
