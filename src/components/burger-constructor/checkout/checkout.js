import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './checkout.module.css';
import { showOrderDetails } from '../../../services/ui/ui-actions';
import { getBurgerState } from '../../../services/burger-ingredients/burger-ingredients-selector';

const Checkout = () => {
  const dispatch = useDispatch();
  const { total } = useSelector(getBurgerState);

  const handleOnCheckout = useCallback(() => {
    dispatch(showOrderDetails());
  }, [dispatch]);

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
        onClick={handleOnCheckout}>
        Оформить заказ
      </Button>
    </div>
  );
};

export default Checkout;
