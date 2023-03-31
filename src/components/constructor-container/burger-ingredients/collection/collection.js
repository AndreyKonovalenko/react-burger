import styles from './collection.module.css';
const Collection = ({ headline, columns }) => {
  return (
    <>
      <div id={headline} className={`${styles.headline} pb-6`}>
        <span className='text text_type_main-medium'>{headline}</span>
      </div>
      <div className={`${styles.typeContainer} pl-4 pr-4 pb-6 pt-6`}>
        <div className={styles.column}>{columns.left}</div>
        <div className={styles.column}>{columns.right}</div>
      </div>
    </>
  );
};

export default Collection;
