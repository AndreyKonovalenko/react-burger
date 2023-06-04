import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { typedUseDispatch } from '../../services/storeTypes';
import { useForm } from '../../components/hooks/use-form';
import styles from './register-page.module.css';
import { LOGIN, REGISTER, REGISTRATION } from '../../utils/ui-constants';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import LoadingBage from '../../components/loading-bage/loading-bage';
import { getAuthState, getFormState } from '../../services/auth/auth-selectors';
import {
  register,
  clearForm,
  clearError,
} from '../../services/auth/auth-actions';
import ErrorBage from '../../components/error-bage/error-bage';

const RegisterPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = typedUseDispatch();

  const handleChange = useForm();
  const { name, email, password } = useSelector(getFormState);
  const { loading, user, error } = useSelector(getAuthState);

  const onRegister = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(register());
    },
    [dispatch]
  );

  useEffect(() => {
    if (user) {
      dispatch(clearForm());
      navigate('/');
    }
    return () => {
      Boolean(error) && dispatch(clearError());
    };
  }, [user, navigate, dispatch, error]);

  const content = (
    <div className={styles.formContainer}>
      <form onSubmit={onRegister} className={styles.form}>
        <p className='text text_type_main-medium'>{REGISTER}</p>
        <Input
          onChange={handleChange}
          value={name}
          name={'name'}
          placeholder='Имя'
        />
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
          {REGISTRATION}
        </Button>
      </form>
      <div>
        <span className='text text_type_main-default text_color_inactive'>
          Ужу зарегисртрировались?{' '}
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
      {loading ? <LoadingBage /> : content}
    </div>
  );
};

export default RegisterPage;
