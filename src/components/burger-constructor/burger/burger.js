import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import styles from './burger.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerElement from '../burger-element/burger-element';

import { addIngredient } from '../../../services/burger-constructor/burger-constructor-actions';

const Burger = () => {
  const dispatch = useDispatch();
  const burgerState = useSelector((state) => state.burger);
  const { ingredients } = useSelector((state) => state.ingredients);
  const { bun, mainAndSauce } = burgerState;

  const [{ isHover }, drop] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
  });

  const bunElement = bun
    ? ingredients.find((element) => element._id === bun.ingredientId)
    : null;

  const restIngredients =
    mainAndSauce.length > 0
      ? mainAndSauce.map((mAsElement, index) => {
          const ingredient = ingredients.find(
            (element) => element._id === mAsElement.ingredientId
          );
          return (
            <BurgerElement
              key={mAsElement.id}
              id={mAsElement.id}
              ingredient={ingredient}
              index={index}
            />
          );
        })
      : null;

  return (
    <div
      className={`${styles.container} ${isHover && styles.droppable} mt-25`}
      ref={drop}>
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

export default Burger;
