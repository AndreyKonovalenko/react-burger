import styles from './error-bage.module.css';

type TProps = {
  error: string;
};
const ErrorBage = ({ error }: TProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <p className='text text_type_main-large mb-4'>{error}</p>
      <p className='text text_type_main-medium'>Kажется что-то пошло не так!</p>
    </div>
  );
};

export default ErrorBage;
