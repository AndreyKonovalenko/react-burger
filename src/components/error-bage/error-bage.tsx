import styles from './error-bage.module.css';
import { SOMETHING_WENT_WRONG } from '../../utils/ui-constants';

type TProps = {
  error: string;
};
const ErrorBage = ({ error }: TProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <p className='text text_type_main-large mb-4'>{error}</p>
      <p className='text text_type_main-medium'>{SOMETHING_WENT_WRONG}</p>
    </div>
  );
};

export default ErrorBage;
