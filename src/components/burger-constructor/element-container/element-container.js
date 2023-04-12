import { useContext } from 'react';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import styles from './element-container.module.css';
import * as actionTypes from '../../../services/actionTypes';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  ingredientPropTypes,
  burgerPropTypes,
} from '../../../utils/prop-types';
import { BurgerContext, IngredientsContext } from '../../../services/appContex';

const ElementContainer = () => {
  const { data } = useContext(IngredientsContext);
  const { burgerState, burgerDispatcher } = useContext(BurgerContext);
  const { bun, mainAndSauce } = burgerState;
  console.log(bun, mainAndSauce);

  const bunElement = bun ? data.find((element) => element._id === bun) : null;
  const restIngredients =
    mainAndSauce.length > 0
      ? mainAndSauce.map((id) => {
          const ingredient = data.find((element) => element._id === id);
          return (
            <div key={uniqid()} className={styles.itemContainer}>
              <DragIcon type='primary' />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() =>
                  burgerDispatcher({
                    type: actionTypes.REMOVE_MAIN_AND_SAUCE,
                    payload: ingredient._id,
                  })
                }
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
            price={200}
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
            price={200}
            thumbnail={bunElement.image}
          />
        </div>
      )}
    </div>
  );
};

// ElementContainer.propTypes = {
//   data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
//   burger: burgerPropTypes.isRequired,
// };

export default ElementContainer;
