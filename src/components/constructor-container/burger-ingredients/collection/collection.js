import PropTypes from 'prop-types';
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

const columnsPropTypes = PropTypes.shape({
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
});

Collection.propTypes = {
  headline: PropTypes.string.isRequired,
  columns: columnsPropTypes.isRequired,
};

export default Collection;
