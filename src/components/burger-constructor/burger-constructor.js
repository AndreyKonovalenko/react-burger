import PropTypes from 'prop-types';
import ElementContainer from './element-container/element-container';
import Checkout from './checkout/checkout';
import styles from './burger-constructor.module.css';
const BurgerConstructor = ({ onCheckout }) => {
  return (
    <div className={styles.container}>
      <ElementContainer />
      <Checkout onCheckout={onCheckout} />
    </div>
  );
};

BurgerConstructor.propTypes = {
  onCheckout: PropTypes.func.isRequired,
};

export default BurgerConstructor;
