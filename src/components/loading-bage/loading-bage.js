import styles from './loading-bage.module.css';
const LoadingBage = () => {
  return (
    <div className={styles.container}>
      <p className='text text_type_main-large'>Loading...</p>
    </div>
  );
};

export default LoadingBage;
