import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getFormState, getAuthState } from '../../services/auth/auth-selectors';
import {
  setFormValue,
  clearForm,
  updateUserData,
} from '../../services/auth/auth-actions';
import { SAVE } from '../../utils/ui-constants';
import styles from './prfile-use-form.module.css';

const ProfileUserForm = () => {
  const dispatch = useDispatch();
  const { name, email, password } = useSelector(getFormState);
  const { user } = useSelector(getAuthState);

  const onChange = useCallback(
    (e) => {
      dispatch(setFormValue({ field: e.target.name, value: e.target.value }));
    },
    [dispatch]
  );
  const onSave = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(updateUserData());
      dispatch(clearForm());
    },
    [dispatch]
  );

  useEffect(() => {
    if (!Boolean(name) && !Boolean(email) && user) {
      dispatch(setFormValue({ field: 'name', value: user.name }));
      dispatch(setFormValue({ field: 'email', value: user.email }));
    }
  }, [dispatch, email, name, user]);

  return (
    <form onSubmit={onSave} className={styles.form}>
      <Input onChange={onChange} value={name} name={'name'} placeholder='Имя' />
      <EmailInput
        onChange={onChange}
        value={email}
        name={'email'}
        placeholder='E-mail'
      />
      <PasswordInput onChange={onChange} value={password} name={'password'} />
      <Button htmlType='submit' type='primary' size='medium'>
        {SAVE}
      </Button>
    </form>
  );
};
export default ProfileUserForm;
