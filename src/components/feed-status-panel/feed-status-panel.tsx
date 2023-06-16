import styles from './feed-status-panel.module.css';
import { useSelector } from 'react-redux';
import { getWSState } from '../../services/ws/ws-selector';
import {
  COMPLETED,
  COMPLETED_ALL_THE_TIME,
  COMPLETED_TODAY,
  ORDERS_IN_PROGRESS,
} from '../../utils/ui-constants';
import uniqid from 'uniqid';

const FeedStatusPanel = (): JSX.Element => {
  const { wsConnected, message } = useSelector(getWSState);

  let content = <></>;
  let doneColumn = <></>;
  let done = [];

  let inProgressColumn = <></>;
  let progress = [];

  const chunk = (arr: any[], size: number) =>
    arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );

  if (wsConnected && message?.success) {
    for (const element of message.orders) {
      if (element.status === 'done') {
        done.push(
          <p key={element._id} className='text text_type_digits-default'>
            {element.number}
          </p>
        );
      }
      if (element.status !== 'done') {
        progress.push(
          <p key={element._id} className='text text_type_digits-default'>
            {element.number}
          </p>
        );
      }
    }

    doneColumn = chunk(done, 5).map((element: JSX.Element[]) => {
      return (
        <div
          key={uniqid()}
          className={styles.column}
          style={{ color: '#00CCCC' }}>
          {element}
        </div>
      );
    });

    inProgressColumn = chunk(progress, 5).map((element: JSX.Element[]) => {
      return (
        <div key={uniqid()} className={styles.column}>
          {element}
        </div>
      );
    });

    content = (
      <div className={styles.container}>
        <div className={styles.ordersBoardConatainer}>
          <div className={styles.orderBoardColumn}>
            <div>
              <p className='text text_type_main-medium'>{COMPLETED}</p>
            </div>
            <div className={styles.columnContainer}>{doneColumn}</div>
          </div>
          <div className={styles.orderBoardColumn}>
            <div>
              <p className='text text_type_main-medium'>{ORDERS_IN_PROGRESS}</p>
            </div>
            <div className={styles.columnContainer}>{inProgressColumn}</div>
          </div>
        </div>
        <div className={styles.completedContainer}>
          <p className='text text_type_main-medium'>{COMPLETED_ALL_THE_TIME}</p>
          <p className={`${styles.shadow} text text_type_digits-large`}>
            {message.total}
          </p>
        </div>
        <div className={styles.completedContainer}>
          <p className='text text_type_main-medium'>{COMPLETED_TODAY}</p>
          <p className={`${styles.shadow} text text_type_digits-large`}>
            {message.totalToday}
          </p>
        </div>
      </div>
    );
  }

  return content;
};
export default FeedStatusPanel;
