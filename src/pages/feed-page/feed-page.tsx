import styles from './feed-page.module.css';
import { useEffect } from 'react';
import { typedUseDispatch } from '../../services/storeTypes';
import { conntectToAll, disconnect } from '../../services/ws/ws-actions';
const FeedPage = (): JSX.Element => {
  const dispatch = typedUseDispatch();
  useEffect(() => {
    dispatch(conntectToAll());
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);
  return <main className={styles.container}>Feed Page</main>;
};

export default FeedPage;
