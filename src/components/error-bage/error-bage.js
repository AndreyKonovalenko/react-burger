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
export default ErrorBage;
