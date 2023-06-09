import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { typedUseDispatch } from '../../../services/storeTypes';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import styles from './checkout.module.css';
import { showOrderDetails } from '../../../services/ui/ui-actions';
import { getBurgerState } from '../../../services/burger-constructor/burger-constructor-selectors';
import { getUserState } from '../../../services/auth/auth-selectors';

const Checkout = (): JSX.Element => {
  const dispatch = typedUseDispatch();
  const navigate = useNavigate();
  const { bun, total } = useSelector(getBurgerState);
  const user = useSelector(getUserState);

  const handleOnCheckout = useCallback(() => {
    user ? dispatch(showOrderDetails()) : navigate('/login');
  }, [dispatch, navigate, user]);

  return (
    <div className={styles.container}>
      <div className={styles.price}>
        <p className='text text_type_digits-medium'>{total}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        disabled={bun ? false : true}
        onClick={handleOnCheckout}
        data-testid='checkout'>
        Оформить заказ
      </Button>
    </div>
  );
};

export default Checkout;
