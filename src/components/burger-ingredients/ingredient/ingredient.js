import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../../utils/prop-types';
import styles from './ingredient.module.css';

const Ingredient = ({ data, handleOnIngredientClick }) => {
  const { name, image_large, price } = data;
  return (
    <div
      className={styles.relative}
      onClick={() => handleOnIngredientClick(data)}>
      <Counter
        count={1}
        size='default'
        className={styles.counter}
        extraClass='m-1'
      />
      <div className={`${styles.container} pb-10`}>
        <img src={image_large} width={240} height={120} alt={name} />
        <div className={`${styles.priceContainer} mb-2 mt-2`}>
          <span className='text text_type_digits-default'>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <div className={styles.nameConatiner}>
          <p className={`${styles.text} "text text_type_main-default`}>
            {name}
          </p>
        </div>
      </div>
    </div>
  );
};

Ingredient.propTypes = {
  data: ingredientPropTypes.isRequired,
  handleOnIngredientClick: PropTypes.func.isRequired,
};

export default Ingredient;
