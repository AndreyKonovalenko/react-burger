import PropTypes from 'prop-types';
import ElementContainer from './element-container/element-container';
import Checkout from './checkout/checkout';
import styles from './burger-constructor.module.css';
import {
  ingredientPropTypes,
  burgerPropTypes,
} from '../../../utils/prop-types';

const BurgerConstructor = ({ burger, data }) => {
  return (
    <div className={styles.container}>
      <ElementContainer burger={burger} data={data} />
      <Checkout />
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  burger: burgerPropTypes.isRequired,
};

export default BurgerConstructor;
