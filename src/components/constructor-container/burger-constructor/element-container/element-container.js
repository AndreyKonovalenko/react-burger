import styles from './element-container.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../../../utils/data';

const ElementContainer = ({ burger }) => {
  const { top, bottom, rest } = burger;
  const bunTop = data.find((element) => element._id === top);
  const bunBottom = data.find((element) => element._id === bottom);
  const restIngredients = [];
  rest.forEach((id) =>
    restIngredients.push(data.find((element) => element._id === id))
  );
  return (
    <div className={`${styles.container} mt-25`}>
      <div className={`${styles.itemContainer} pr-4`}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={bunTop.name}
          price={200}
          thumbnail={bunTop.image}
        />
      </div>
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
      <div className={`${styles.itemContainer} pr-4`}>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={bunBottom.name}
          price={200}
          thumbnail={bunBottom.image}
        />
      </div>
    </div>
  );
};

export default ElementContainer;
