import { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './element-container.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  ingredientPropTypes,
  burgerPropTypes,
} from '../../../utils/prop-types';
import { IngredientsContext } from '../../../services/ingredientsContex';

const ElementContainer = ({ burger }) => {
  const data = useContext(IngredientsContext);
  const { top, bottom, rest } = burger;
  const bunTop = data.find((element) => element._id === top);
  const bunBottom = data.find((element) => element._id === bottom);
  const restIngredients = [];
  if (rest) {
    rest.forEach((id) =>
      restIngredients.push(data.find((element) => element._id === id))
    );
  }

  return (
    <div className={`${styles.container} mt-25`}>
      {bunTop && (
        <div className={`${styles.itemContainer} pr-4`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${bunTop.name} (верх)`}
            price={200}
            thumbnail={bunTop.image}
          />
        </div>
      )}
      {restIngredients.length > 0 && (
        <div className={`${styles.middle} pr-2`}>
          {restIngredients.map((element) => (
            <div key={element._id} className={styles.itemContainer}>
              <DragIcon type='primary' />
              <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image}
              />
            </div>
          ))}
        </div>
      )}
      {bunBottom && (
        <div className={`${styles.itemContainer} pr-4`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bunBottom.name} (низ)`}
            price={200}
            thumbnail={bunBottom.image}
          />
        </div>
      )}
    </div>
  );
};

ElementContainer.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  burger: burgerPropTypes.isRequired,
};

export default ElementContainer;
