import { Link, useNavigate } from 'react-router-dom';
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
} from '../../services/auth/auth-actions';

const ForgetPassowrdPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(getAuthError);
  const { email } = useSelector(getFormState);
  const { loading, message } = useSelector(getAuthState);

  const onChange = useCallback(
    (e) => {
      dispatch(setFormValue({ field: e.target.name, value: e.target.value }));
    },
    [dispatch]
  );
  const onRecover = useCallback(() => {
    dispatch(rocoverPassword());
  }, [dispatch]);

  useEffect(() => {
    if (message === 'Reset email sent') {
      navigate('/reset-password');
    }
    return () => Boolean(message) && dispatch(clearMessage());
  }, [dispatch, navigate, message]);

  const content = (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <p className='text text_type_main-medium'>{PASWORD_RESTORATION}</p>
        <EmailInput
          onChange={onChange}
          value={email}
          name={'email'}
          placeholder='E-mail'
        />
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={onRecover}>
          {RECOVER}
        </Button>
      </div>
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
