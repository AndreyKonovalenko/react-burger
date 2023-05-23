import { forwardRef } from 'react';
import styles from './collection.module.css';

type TCollection = {
  headline: string;
  columns: {
    left: Array<JSX.Element>;
    right: Array<JSX.Element>;
  };
}


const Collection = forwardRef(({headline, columns} : TCollection, ref: React.Ref<HTMLDivElement>)  => {
  return (
    <>
      <div
        ref={ref}
        title={headline}
        className={`${styles.headline} pb-6`}>
        <span className='text text_type_main-medium'>{headline}</span>
      </div>
      <div className={`${styles.typeContainer} pl-4 pr-4 pb-6 pt-6`}>
        <div className={styles.column}>{columns.left}</div>
        <div className={styles.column}>{columns.right}</div>
      </div>
    </>
  );
});

export default Collection;
