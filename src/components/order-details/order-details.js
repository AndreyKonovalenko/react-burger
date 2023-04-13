import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import DoneImage from "../../images/graphics.svg";
import { useContext, useEffect, useState } from "react";
import { BurgerContext } from "../../services/appContex";
import { sendOrder } from "../../utils/burger-api";

const OrederDetails = () => {
  const { burgerState } = useContext(BurgerContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const postOrder = async () => {
      try {
        const response = await sendOrder({ ingredients: burgerState.order });
        setData(response);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setLoading(false);
      }
    };
    postOrder();
  }, [burgerState.order]);

  return !loading && data ? (
    <div className={`${styles.container} mb-20 mt-4`}>
      <div>
        <p className={`${styles.orderIdText} text text_type_digits-large`}>
          {data.order.number}
        </p>
      </div>
      <div>
        <p className="text text_type_main-medium">идентификатор заказа</p>
      </div>
      <div className={`${styles.iconContainer} mb-7 mt-8`}>
        <img src={DoneImage} alt="done" />
      </div>
      <div className={styles.messageContainer}>
        <div>
          <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

// const orderPropTyps = PropTypes.shape({
//   top: PropTypes.string.isRequired,
//   bottom: PropTypes.string.isRequired,
//   rest: PropTypes.arrayOf(PropTypes.string),
// });

// OrederDetails.propTypes = {
//   order: orderPropTyps.isRequired,
// };

export default OrederDetails;
