import PropTypes from "prop-types";
import { useContext } from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./checkout.module.css";

import { BurgerContext } from "../../../services/appContex";

const Checkout = ({ onCheckout }) => {
  const { burgerState } = useContext(BurgerContext);

  return (
    <div className={styles.container}>
      <div className={styles.price}>
        <p className="text text_type_digits-medium">{burgerState.total}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={onCheckout}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

Checkout.propTypes = {
  onCheckout: PropTypes.func.isRequired,
};

export default Checkout;
