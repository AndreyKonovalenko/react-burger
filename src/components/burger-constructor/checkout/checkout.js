import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './checkout.module.css';

const Checkout = ({ onCheckout }) => {
  return (
    <div className={styles.container}>
      <div className={styles.price}>
        <p className='text text_type_digits-medium'>610</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        onClick={onCheckout}>
        Оформить заказ
      </Button>
    </div>
  );
};

Checkout.propTypes = {
  onCheckout: PropTypes.func.isRequired,
};

export default Checkout;
