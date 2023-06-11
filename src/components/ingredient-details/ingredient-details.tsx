import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { typedUseDispatch } from '../../services/storeTypes';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { getUiState } from '../../services/ui/ui-selectors';
import { getIngredientsState } from '../../services/burger-ingredients/burger-ingredients-selector';
import { selectIngredient } from '../../services/ui/ui-actions';
import { TIngredient } from '../../utils/types';

const NUTRIENTS = [
  {
    name: 'calories',
    text: 'Калории, ккал',
  },
  { name: 'proteins', text: 'Белки, г' },
  { name: 'fat', text: 'Жиры, г' },
  { name: 'carbohydrates', text: 'Углеводы, г' },
];

const IngredientDetails = (): JSX.Element | null => {
  const dispatch = typedUseDispatch();
  const { id } = useParams();
  const { ingredients } = useSelector(getIngredientsState);
  const { ingredient } = useSelector(getUiState);

  useEffect(() => {
    if (ingredients.length > 0) {
      const ingredient = ingredients.find((element) => element._id === id);
      dispatch(selectIngredient(ingredient!));
    }
  }, [dispatch, id, ingredients]);

  return Boolean(ingredient) ? (
    <div className={styles.container}>
      <div>
        <img
          className={styles.image}
          src={ingredient!.image_large}
          alt='ingredient'
        />
      </div>
      <div>
        <p className='className="text text_type_main-medium'>
          {ingredient!.name}
        </p>
      </div>
      <div className={styles.nutrientsContainer}>
        {NUTRIENTS.map((element, index) => (
          <div
            className={`${styles.infoContaienr} pt-5`}
            key={index + element.text}>
            <div>
              <p className='text text_type_main-default text_color_inactive'>
                {element.text}
              </p>
            </div>
            <div>
              <p className='text text_type_digits-default text_color_inactive'>
                {ingredient![element.name as keyof TIngredient]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default IngredientDetails;
