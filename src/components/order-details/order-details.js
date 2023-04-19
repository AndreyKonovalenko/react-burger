import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './order-details.module.css';
import ErrorBage from '../error-bage/error-bage';
import LoadingBage from '../loading-bage/loading-bage';
import DoneImage from '../../images/graphics.svg';
import { postOrder } from '../../services/burger-constructor/burger-constructor-actions';

const OrederDetails = () => {
  const dispatch = useDispatch();
  const { invoice, loading, error } = useSelector((state) => state.burger);

  useEffect(() => {
    dispatch(postOrder());
  }, [dispatch]);

  const orderDetails = invoice ? (
    <div className={`${styles.container} mb-20 mt-4`}>
      <div>
        <p className={`${styles.orderIdText} text text_type_digits-large`}>
          {invoice.order.number}
        </p>
      </div>
      <div>
        <p className='text text_type_main-medium'>идентификатор заказа</p>
      </div>
      <div className={`${styles.iconContainer} mb-7 mt-8`}>
        <img src={DoneImage} alt='done' />
      </div>
      <div className={styles.messageContainer}>
        <div>
          <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
        </div>
        <div>
          <p className='text text_type_main-default text_color_inactive'>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>
    </div>
  ) : null;

  return !loading ? (
    Boolean(error) ? (
      <ErrorBage error={error} />
    ) : (
      orderDetails
    )
  ) : (
    <LoadingBage />
  );
};

export default OrederDetails;
