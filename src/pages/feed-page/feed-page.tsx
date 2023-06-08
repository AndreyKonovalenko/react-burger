import styles from './feed-page.module.css';
import { useEffect } from 'react';
import { typedUseDispatch } from '../../services/storeTypes';
import { conntectToAll, disconnect } from '../../services/ws/ws-actions';
import Feed from '../../components/feed/feed';
import { FEED } from '../../utils/ui-constants';
const FeedPage = (): JSX.Element => {
  const dispatch = typedUseDispatch();
  useEffect(() => {
    dispatch(conntectToAll());
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);
  return (
    <main className={styles.wrapper}>
      <div className={styles.heading}>
        <p className='text text_type_main-large'>{FEED}</p>
      </div>
      <div className={styles.container}>
        <Feed />
      </div>
    </main>
  );
};

export default FeedPage;
