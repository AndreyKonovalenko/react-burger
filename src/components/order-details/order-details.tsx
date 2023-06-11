import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { typedUseDispatch } from '../../services/storeTypes';
import { useParams } from 'react-router-dom';
import styles from './order-details.module.css';
import { getUiState } from '../../services/ui/ui-selectors';
import { selectOrder } from '../../services/ui/ui-actions';
import { getWSState } from '../../services/ws/ws-selector';
import { DONE, IN_PROGRESS, COMPOUND } from '../../utils/ui-constants';
import { getIngredientsList } from '../../services/burger-ingredients/burger-ingredients-selector';
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = (): JSX.Element | null => {
  const dispatch = typedUseDispatch();
  const { number } = useParams();
  const ingredientsList = useSelector(getIngredientsList);
  const { order } = useSelector(getUiState);
  const { message } = useSelector(getWSState);
  let total = 0;

  useEffect(() => {
    if (message?.success && message.orders.length > 0) {
      const order = message.orders.find(
        (element) => element.number.toString() === number
      );
      dispatch(selectOrder(order!));
    }
  }, [dispatch, number, message, order]);

  type TRepetition = { [key: string]: number };

  const ingredientCards = [];

  if (Boolean(order) && ingredientsList.length > 0) {
    const repetition = order!.ingredients.reduce(
      (acc: TRepetition, value) => ({
        ...acc,
        [value]: (acc[value as keyof TRepetition] || 0) + 1,
      }),
      {}
    );

    for (const property in repetition) {
      const ingredient = ingredientsList.find(
        (element) => element._id === property
      );

      total = total + ingredient!.price * repetition[property];
      ingredientCards.push(
        <div key={property} className={styles.cardContaienr}>
          <div className={styles.imgAndTextContainer}>
            <div className={styles.imageContainer}>
              <div className={styles.imageBorder}>
                <img
                  src={ingredient!.image}
                  width={112}
                  height={56}
                  alt={ingredient!.name}
                />
              </div>
            </div>
            <div className={styles.text}>
              <p className='text text_type_main-default'>{ingredient!.name}</p>
            </div>
          </div>
          <div className={styles.totalPriceContainer}>
            <div>
              <p className='text text_type_digits-default'>{`${repetition[property]} x ${ingredient?.price}`}</p>
            </div>
            <div className={styles.icon}>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </div>
      );
    }
  }

  return Boolean(order) ? (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <p className='text text_type_main-medium'>{order!.name}</p>
        <p className='text text_type_main-default' style={{ color: '#00CCCC' }}>
          {order!.status === 'done' ? DONE : IN_PROGRESS}
        </p>
      </div>
      <div className={styles.ingredientsContainer}>
        <div>
          <p className='text text_type_main-medium'>{COMPOUND}</p>
        </div>
        <div className={styles.scrollbar}>
          <div className={styles.scrollArea}>{ingredientCards}</div>
        </div>
      </div>

      <div className={styles.summaryContainer}>
        <div>
          <p className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={new Date(order!.updatedAt)} />
          </p>
        </div>
        <div className={styles.totalPriceContainer}>
          <div>
            <p className='text text_type_digits-default'>{total}</p>
          </div>
          <div className={styles.icon}>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default OrderDetails;
