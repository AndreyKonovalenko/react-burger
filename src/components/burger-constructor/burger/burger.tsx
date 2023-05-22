import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import styles from "./burger.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerElement from "../burger-element/burger-element";
import { addIngredient } from "../../../services/burger-constructor/burger-constructor-actions";
import { getBurgerState } from "../../../services/burger-ingredients/burger-ingredients-selector";
import { getIngredientsState } from "../../../services/burger-constructor/burger-constructor-selectors";
import { TIngredient } from "../../../utils/types";

type TMAsElement = {
  id: string;
  ingredientId: string;
  price: number;
}

const Burger = (): JSX.Element => {
  const dispatch = useDispatch() as any;
  const { bun, mainAndSauce } = useSelector(getBurgerState);
  const { ingredients } = useSelector(getIngredientsState);


  const [{ isHover }, drop] = useDrop<TIngredient, unknown, {isHover: boolean} >({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
  });

  const bunElement = bun
    ? ingredients.find((element: TIngredient) => element._id === bun.ingredientId)
    : null;

  const restIngredients =
    mainAndSauce.length > 0
      ? mainAndSauce.map((mAsElement: TMAsElement, index:number) => {
          const ingredient = ingredients.find(
            (element: TIngredient) => element._id === mAsElement.ingredientId
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
      ref={drop}
    >
      {bunElement && (
        <div className={`${styles.itemContainer} pr-4`}>
          <ConstructorElement
            type="top"
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
            type="bottom"
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
