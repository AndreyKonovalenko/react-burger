import PropTypes from "prop-types";
import styles from "./error-bage.module.css";
const ErrorBage = ({ error }) => {
  return (
    <div className={styles.container}>
      <p className="text text_type_main-large mb-4">{error}</p>
      <p className="text text_type_main-medium">Kажется что-то пошло не так!</p>
    </div>
  );
};
ErrorBage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorBage;
