import PropTypes from "prop-types";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-element.module.css";
import { ingredientPropTypes } from "../../../utils/types";
import { removeMainAndSauce } from "../../../services/burger-constructor/burger-constructor-actions";
import { reorder } from "../../../services/burger-constructor/burger-constructor-actions";
import { useDrag, useDrop } from "react-dnd";

const BurgerElement = ({ id, ingredient, index }) => {
  const ref = useRef(null);
  const { name, price, image } = ingredient;
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: "burger-element",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(reorder(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "burger-element",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div className={styles.container} style={{ opacity: opacity }} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => dispatch(removeMainAndSauce(id))}
      />
    </div>
  );
};

BurgerElement.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default BurgerElement;
