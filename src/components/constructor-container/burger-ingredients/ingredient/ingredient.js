import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';

const Ingredient = ({ data }) => {
  const { name, image_large, price } = data;
  return (
    <div className={styles.container}>
      <img src={image_large} width={240} height={120} alt={name} />
      <div className={`${styles.priceContainer} mb-2 mt-2`}>
        <span>{price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <div className={styles.nameConatiner}>
        <p className={styles.text}>{name}</p>
      </div>
    </div>
  );
};
const ingredientPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_large: PropTypes.string.isRequired,
});
Ingredient.propTypes = {
  data: ingredientPropTypes.isRequired,
};

export default Ingredient;

// Ingredient.propTypes = PropTypes.shape({
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   proteins: PropTypes.number.isRequired,
//   fat: PropTypes.number.isRequired,
//   carbohydrates: PropTypes.number.isRequired,
//   calories: PropTypes.number.isRequired,
//   price: PropTypes.number.isRequired,
//   image: PropTypes.string.isRequired,
//   image_mobile: PropTypes.string.isRequired,
//   image_large: PropTypes.string.isRequired,
//   __v: 0,
// });
