import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../../utils/prop-types";
import { selectIngredient } from "../../../services/ui/ui-actions";
import { getBurgerState } from "../../../services/burger-ingredients/burger-ingredients-selector";
import styles from "./ingredient.module.css";

const Ingredient = (ingredient) => {
  const dispatch = useDispatch();
  const { name, image_large, price, _id, type } = ingredient;
  const { bun, mainAndSauce } = useSelector(getBurgerState);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleOnIngredientClick = useCallback(
    (ingredient) => {
      dispatch(selectIngredient(ingredient));
      window.history.pushState(
        { id: ingredient._id },
        "",
        `/ingredients/${ingredient._id}`
      );
    },
    [dispatch]
  );

  const handlePointer = useCallback((e) => {
    e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  let count = null;

  if (bun && type === "bun") {
    count = _id === bun.ingredientId ? 2 : null;
  }

  if (type !== "bun" && mainAndSauce.length > 0) {
    for (const element of mainAndSauce) {
      if (element.ingredientId === _id) {
        count++;
      }
    }
  }

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      className={styles.wrapper}
      style={{ opacity: opacity }}
      ref={drag}
      onClick={() => handleOnIngredientClick(ingredient)}
      onPointerEnter={(e) => handlePointer(e)}
    >
      {count && (
        <Counter
          count={count}
          size="default"
          className={styles.counter}
          extraClass="m-1"
        />
      )}
      <div className={`${styles.container} pb-10`}>
        <img src={image_large} width={240} height={120} alt={name} />
        <div className={`${styles.priceContainer} mb-2 mt-2`}>
          <span className="text text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" />
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
