import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import DoneImage from '../../images/graphics.svg';

const OrederDetails = ({ order }) => {
  const { orderId } = order;
  return (
    <div className={`${styles.container} mb-20 mt-4`}>
      <div>
        <p className={`${styles.orderIdText} text text_type_digits-large`}>
          {orderId}
        </p>
      </div>
      <div>
        <p className='text text_type_main-medium'>идентификатор заказа</p>
      </div>
      <div className={`${styles.iconContainer} mb-7 mt-8`}>
        <img src={DoneImage} alt='done' />
      </div>
      <div className={styles.messageContainer}>
        <div>
          <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
        </div>
        <div>
          <p className='text text_type_main-default text_color_inactive'>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>
    </div>
  );
};

OrederDetails.propTypes = {
  order: PropTypes.object.isRequired,
};
export default OrederDetails;
