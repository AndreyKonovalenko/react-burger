import styles from './model-overlay.module.css';

const ModelOverlay = ({ onClose }) => (
  <div className={styles.modalOverlay} onClick={onClose} />
);

export default ModelOverlay;
