import PropTypes from 'prop-types';
import styles from './model-overlay.module.css';

const ModelOverlay = ({ onClose }) => (
  <div className={styles.modalOverlay} onClick={onClose} />
);

ModelOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModelOverlay;
