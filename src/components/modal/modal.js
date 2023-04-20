import PropTypes from "prop-types";
import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEscapeKey } from "../hooks/use-escape-key";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModelOverlay from "./model-overlay/model-overlay";
import {
  unSelectIngredient,
  hideOrderDetails,
} from "../../services/ui/ui-actions";

import styles from "./modal.module.css";

const Modal = ({ children, hasTitle }) => {
  const dispatch = useDispatch();
  const { ingredient, orderIsShown } = useSelector((state) => state.ui);

  const handleModalClose = useCallback(() => {
    ingredient && dispatch(unSelectIngredient());
    orderIsShown && dispatch(hideOrderDetails());
  }, [dispatch, ingredient, orderIsShown]);

  useEscapeKey(handleModalClose);

  useEffect(() => {
    document.body.classList.add(styles.hideOverflowInBody);
    return () => {
      document.body.classList.remove(styles.hideOverflowInBody);
    };
  }, []);

  const modal = (
    <>
      <div className={`${styles.container} p-10`}>
        <div className={styles.info}>
          <div>
            <p className="text text_type_main-large">
              {hasTitle ? "Детали ингредиета" : null}
            </p>
          </div>
          <div onClick={handleModalClose} className={styles.backDoor}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
      <ModelOverlay onClose={handleModalClose} />
    </>
  );
  return createPortal(modal, document.body);
};

Modal.propTypes = {
  hasTitle: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;
