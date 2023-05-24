import styles from './model-overlay.module.css';

type TProps = {
  onClose: () => void;
};

const ModelOverlay = ({ onClose }: TProps): JSX.Element => (
  <div className={styles.modalOverlay} onClick={onClose} />
);

export default ModelOverlay;
