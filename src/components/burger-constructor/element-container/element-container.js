import { useSelector, useDispatch } from 'react-redux';
import styles from './element-container.module.css';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { removeMainAndSauce } from '../../../services/burger-constructor/burger-constructor-actions';

const ElementContainer = () => {
  const dispatch = useDispatch();
  const burgerState = useSelector((state) => state.burger);
  const { ingredients } = useSelector((state) => state.ingredients);
  const { bun, mainAndSauce } = burgerState;

  const bunElement = bun
    ? ingredients.find((element) => element._id === bun.ingredientId)
    : null;
  const restIngredients =
    mainAndSauce.length > 0
      ? mainAndSauce.map((mAsElement) => {
          const ingredient = ingredients.find(
            (element) => element._id === mAsElement.ingredientId
          );

          return (
            <div key={mAsElement.id} className={styles.itemContainer}>
              <DragIcon type='primary' />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => {
                  dispatch(removeMainAndSauce(mAsElement.id));
                }}
              />
            </div>
          );
        })
      : null;

  return (
    <div className={`${styles.container} mt-25`}>
      {bunElement && (
        <div className={`${styles.itemContainer} pr-4`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${bunElement.name} (верх)`}
            price={bunElement.price}
            thumbnail={bunElement.image}
          />
        </div>
      )}
      <div className={`${styles.middle} pr-2`}>{restIngredients}</div>
      {bunElement && (
        <div className={`${styles.itemContainer} pr-4`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bunElement.name} (низ)`}
            price={bunElement.price}
            thumbnail={bunElement.image}
          />
        </div>
      )}
    </div>
  );
};

export default ElementContainer;
