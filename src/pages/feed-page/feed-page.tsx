import styles from './feed-page.module.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { typedUseDispatch } from '../../services/storeTypes';
import { conntectToAll, disconnect } from '../../services/ws/ws-actions';
import Feed from '../../components/feed/feed';
import FeedStatusPanel from '../../components/feed-status-panel/feed-status-panel';
import { FEED } from '../../utils/ui-constants';
import LoadingBage from '../../components/loading-bage/loading-bage';
import ErrorBage from '../../components/error-bage/error-bage';
import { getWSState } from '../../services/ws/ws-selector';
const FeedPage = (): JSX.Element => {
  const { wsConnected, message } = useSelector(getWSState);

  const dispatch = typedUseDispatch();
  useEffect(() => {
    dispatch(conntectToAll());
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  let content;

  if (!wsConnected && !message) {
    content = <LoadingBage />;
  }

  if (!message?.success) {
    content = <ErrorBage error={message?.message as string} />;
  }

  if (wsConnected && message?.success) {
    content = (
      <div className={styles.container}>
        <Feed />
        <FeedStatusPanel />
      </div>
    );
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.heading}>
        <p className='text text_type_main-large'>{FEED}</p>
      </div>
      {content}
    </main>
  );
};

export default FeedPage;
