import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { typedUseDispatch } from '../../services/storeTypes';
import { useSelector } from 'react-redux';
import type { TOrder } from '../../services/ws/ws-reducer';
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import { selectOrder } from '../../services/ui/ui-actions';
import { getIngredientsList } from '../../services/burger-ingredients/burger-ingredients-selector';
import { DONE, IN_PROGRESS } from '../../utils/ui-constants';

type TOrderCard = {
  order: TOrder;
  statusInfo: boolean;
};

const OrderCard = ({ order, statusInfo }: TOrderCard): JSX.Element => {
  const ingredientsList = useSelector(getIngredientsList);
  const dispatch = typedUseDispatch();
  const location = useLocation();
  const { pathname } = location;
  const { name, number, status, updatedAt, ingredients } = order;
  let total: number = 0;

  const handleOnOrderClick = useCallback(
    (order: TOrder): void => {
      dispatch(selectOrder(order));
    },
    [dispatch]
  );

  const illustrations = ingredients.map((id, index) => {
    if (ingredientsList.length > 0 && ingredients.length > 0 && index <= 5) {
      const ingredient = ingredientsList.find((element) => element._id === id);
      total = total + ingredient!.price;
      return (
        <div
          className={styles.imageContainer}
          style={{
            transform: `translate(${-20 * index}px, 0px)`,
            zIndex: 98 - index,
          }}
          key={crypto.randomUUID()}>
          <div className={styles.imageBorder}>
            {ingredients.length > 6 && index === 5 ? (
              <div className={styles.counter}>
                <p className='text text_type_main-default'>
                  +{ingredients.length - 6}
                </p>
              </div>
            ) : null}
            <img
              src={ingredient!.image}
              width={112}
              height={56}
              alt={ingredient!.name}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  });

  return (
    <Link
      className={styles.wrapper}
      to={`${pathname}/${number}`}
      state={{ background: location }}
      onClick={() => handleOnOrderClick(order)}>
      <div className={styles.container}>
        <div className={styles.numberContainer}>
          <div>
            <p className='text text_type_digits-default'>#{number}</p>
          </div>
          <div>
            <p className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(updatedAt)} />
            </p>
          </div>
        </div>
        <div className={styles.headingContainer}>
          <div>
            <p className=' text text_type_main-medium'>{name}</p>
          </div>
          {statusInfo && (
            <div className={styles.status}>
              <p
                className='text text_type_main-default'
                style={status === 'done' ? { color: '#00CCCC' } : undefined}>
                {status === 'done' ? DONE : IN_PROGRESS}
              </p>
            </div>
          )}
        </div>
        <div className={styles.burgerPreview}>
          <div
            className={styles.illustrationsContainer}
            style={{
              width:
                illustrations.length < 6
                  ? `${48 * illustrations.length}px`
                  : '304px',
            }}>
            {illustrations}
          </div>
          <div className={styles.priceContainer}>
            <div>
              <span className='text text_type_digits-default'>{total}</span>
            </div>
            <div className={styles.icon}>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
