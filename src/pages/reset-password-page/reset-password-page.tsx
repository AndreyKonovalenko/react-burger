import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { typedUseDispatch } from '../../services/storeTypes';
import { useForm } from '../../components/hooks/use-form';
import styles from './reset-password-page.module.css';
import { ENTER, SAVE, PASWORD_RESTORATION } from '../../utils/ui-constants';
import {
  PasswordInput,
  Input,
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
  resetPassword,
  clearForm,
  clearMessage,
  clearError,
} from '../../services/auth/auth-actions';
import { TO_FORGOT_PASSWORD } from '../../utils/route-constants';

const ResetPasswordPage = (): JSX.Element => {
  const dispatch = typedUseDispatch();
  const navigate = useNavigate();
  const handleChange = useForm();
  const { token, password } = useSelector(getFormState);
  const error = useSelector(getAuthError);
  const { loading, message, user } = useSelector(getAuthState);
  const { state } = useLocation();

  const onSave = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(resetPassword());
      dispatch(clearForm());
    },
    [dispatch]
  );

  useEffect(() => {
    if (state?.from !== TO_FORGOT_PASSWORD) {
      navigate('/');
    }
    return () => {
      dispatch(clearForm());
      dispatch(clearError());
      Boolean(message) && dispatch(clearMessage());
    };
  }, [dispatch, navigate, message, user, state]);

  const content = (
    <div className={styles.formContainer}>
      {Boolean(message) && (
        <p className='text text_type_main-large mb-6'>{message}</p>
      )}
      <form onSubmit={onSave} className={styles.form}>
        <p className='text text_type_main-medium'>{PASWORD_RESTORATION}</p>
        <PasswordInput
          onChange={handleChange}
          value={password}
          name={'password'}
        />
        <Input
          onChange={handleChange}
          value={token}
          name={'token'}
          placeholder='Введите код из письма'
        />
        <Button htmlType='submit' type='primary' size='medium'>
          {SAVE}
        </Button>
      </form>
      <div>
        <span className='text text_type_main-default text_color_inactive'>
          Забыли пароль?{' '}
          <Link className={styles.link} to='/login'>
            {ENTER}
          </Link>
        </span>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {error && <ErrorBage error={error} />}
      {loading ? <LoadingBage /> : content}
    </div>
  );
};

export default ResetPasswordPage;
