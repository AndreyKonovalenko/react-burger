import PropTypes from 'prop-types';
import ElementContainer from './element-container/element-container';
import Checkout from './checkout/checkout';
import styles from './burger-constructor.module.css';
import { burgerPropTypes, ingredientPropTypes } from '../../utils/prop-types';

const BurgerConstructor = ({ burger, onCheckout }) => {
  return (
    <div className={styles.container}>
      <ElementContainer burger={burger} />
      <Checkout onCheckout={onCheckout} />
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  burger: burgerPropTypes.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default BurgerConstructor;
