import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../utils/types";
import { selectIngredient } from "../../../services/ui/ui-actions";
import { getBurgerState } from "../../../services/burger-ingredients/burger-ingredients-selector";
import styles from "./ingredient.module.css";

const Ingredient = (ingredient: TIngredient): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();

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
    (ingredient: TIngredient) => {
      dispatch(selectIngredient(ingredient));
    },
    [dispatch]
  );

  const handlePointer = useCallback((event: { currentTarget: { scrollIntoView: (arg0: { behavior: string; block: string; }) => void; }; }) => {
    event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  let count: number = 0;

  if (bun && type === "bun") {
    count = _id === bun.ingredientId ? 2 : 0;
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
    <Link
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}
      className={styles.wrapper}
      style={{ opacity: opacity }}
      ref={drag}
      onClick={() => handleOnIngredientClick(ingredient)}
      onPointerEnter={() => handlePointer}
    >
      {Boolean(count) && (
        <Counter
          count={count}
          size="default"
          extraClass={`${styles.couner}"m-1"`}
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
    </Link>
  );
};

export default Ingredient;