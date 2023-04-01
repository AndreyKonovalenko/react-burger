import PropTypes from 'prop-types';
import ElementContainer from './element-container/element-container';
import Checkout from './checkout/checkout';
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ burger }) => {
  return (
    <div className={styles.container}>
      <ElementContainer burger={burger} />
      <Checkout />
    </div>
  );
};

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

const burgerPropTypes = PropTypes.shape({
  top: PropTypes.string.isRequired,
  bottom: PropTypes.string.isRequired,
  rest: PropTypes.arrayOf(PropTypes.string.isRequired),
});

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
  burger: burgerPropTypes,
};

export default BurgerConstructor;
