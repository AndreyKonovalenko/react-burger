import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../../utils/prop-types';
import styles from './ingredient.module.css';
import { addIngredient } from '../../../services/burger-constructor/burger-constructor-actions';
import { selectIngredient } from '../../../services/ui/ui-actions';

const Ingredient = (ingredient) => {
  const { name, image_large, price } = ingredient;

  const dispatch = useDispatch();

  const handleOnIngredientClick = useCallback(
    (ingredient) => {
      dispatch(addIngredient(ingredient));
      dispatch(selectIngredient(ingredient));
    },
    [dispatch]
  );

  return (
    <div
      className={styles.wrapper}
      onClick={() => handleOnIngredientClick(ingredient)}>
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

Ingredient.iropTypes = {
  ingredient: ingredientPropTypes.isRequired,
};
export default Ingredient;
