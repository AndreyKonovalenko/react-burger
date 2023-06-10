import { useSelector } from 'react-redux';
import { typedUseDispatch } from '../../services/storeTypes';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUiState } from '../../services/ui/ui-selectors';
import styles from './order-details-page.module.css';
import OrderDetails from '../../components/order-details/order-details';
import { loadOrderById, unSelectOrder } from '../../services/ui/ui-actions';
import LoadingBage from '../../components/loading-bage/loading-bage';
import ErrorBage from '../../components/error-bage/error-bage';

const OrederDetailsPage = (): JSX.Element | null => {
  const dispatch = typedUseDispatch();
  const { id } = useParams();
  const { order, loading, error } = useSelector(getUiState);

  useEffect(() => {
    if (!order) {
      dispatch(loadOrderById(id!));
    }
    return () => {
      if (order) {
        dispatch(unSelectOrder());
      }
    };
  }, [id, dispatch, order]);

  if (loading) {
    return <LoadingBage />;
  }
  if (error) {
    return <ErrorBage error={error} />;
  }

  return Boolean(order) ? (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className='text text_type_digits-medium'>#{order?.number}</p>
        {<OrderDetails />}
      </div>
    </div>
  ) : null;
};

export default OrederDetailsPage;
