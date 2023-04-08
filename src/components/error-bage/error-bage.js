import PropTypes from 'prop-types';
const ErrorBage = ({ isError }) => {
  return (
    <>
      <p className='text text_type_main-large mt-30'>{isError}</p>
      <p className='text text_type_main-medium mt-5'>
        Kажется что-то пошло не так!
      </p>
    </>
  );
};
ErrorBage.propTypes = {
  isError: PropTypes.string.isRequired,
};

export default ErrorBage;
