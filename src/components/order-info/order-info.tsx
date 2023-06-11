import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { typedUseDispatch } from '../../services/storeTypes';
import styles from './order-info.module.css';
import ErrorBage from '../error-bage/error-bage';
import LoadingBage from '../loading-bage/loading-bage';
import DoneImage from '../../images/graphics.svg';
import { postOrder } from '../../services/burger-constructor/burger-constructor-actions';
import { getBurgerState } from '../../services/burger-constructor/burger-constructor-selectors';

const OrederInfo = (): JSX.Element | null => {
  const dispatch = typedUseDispatch();
  const { invoice, loading, error } = useSelector(getBurgerState);

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

export default OrederInfo;
