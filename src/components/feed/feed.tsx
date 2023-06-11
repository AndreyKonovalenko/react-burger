import { getWSState } from '../../services/ws/ws-selector';
import styles from './feed.module.css';

import OrderCard from '../order-card/order-card';

import { useSelector } from 'react-redux';

const Feed = (): JSX.Element => {
  const { message } = useSelector(getWSState);

  const content = message?.orders.map((element) => {
    return <OrderCard order={element} statusInfo={false} key={element._id} />;
  });

  return (
    <div className={styles.scrollbar}>
      <div className={styles.container}>{content}</div>
    </div>
  );
};

export default Feed;
