import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  setFormValue,
  resetPassword,
  clearForm,
  clearMessage,
  clearError,
} from '../../services/auth/auth-actions';

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, password } = useSelector(getFormState);
  const error = useSelector(getAuthError);
  const { loading, message, user } = useSelector(getAuthState);

  const onChange = useCallback(
    (e) => {
      dispatch(setFormValue({ field: e.target.name, value: e.target.value }));
    },
    [dispatch]
  );
  const onSave = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(resetPassword());
      dispatch(clearForm());
    },
    [dispatch]
  );

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    return () => {
      dispatch(clearForm());
      dispatch(clearError());
      Boolean(message) && dispatch(clearMessage());
    };
  }, [dispatch, navigate, message, user]);

  const content = (
    <div className={styles.formContainer}>
      {Boolean(message) && (
        <p className='text text_type_main-large mb-6'>{message}</p>
      )}
      <form onSubmit={onSave} className={styles.form}>
        <p className='text text_type_main-medium'>{PASWORD_RESTORATION}</p>
        <PasswordInput onChange={onChange} value={password} name={'password'} />
        <Input
          onChange={onChange}
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
