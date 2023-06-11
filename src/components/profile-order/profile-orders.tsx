import { useSelector } from 'react-redux';
import { getWSState } from '../../services/ws/ws-selector';
import OrderCard from '../order-card/order-card';
import ErrorBage from '../error-bage/error-bage';
import LoadingBage from '../loading-bage/loading-bage';
import styles from './prolile-orders.module.css';

const ProfileOrders = (): JSX.Element => {
  const { wsConnected, message } = useSelector(getWSState);

  let content;

  if (!wsConnected && !message) {
    return <LoadingBage />;
  }

  if (!message?.success) {
    return <ErrorBage error={message?.message as string} />;
  }

  if (wsConnected && message?.success) {
    content = message!.orders.map((element) => {
      return <OrderCard order={element} statusInfo={true} key={element._id} />;
    });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollbar}>
        <div className={styles.container}>{content}</div>
      </div>
    </div>
  );
};

export default ProfileOrders;
