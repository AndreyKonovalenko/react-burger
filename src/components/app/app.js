import { useState, useEffect, useCallback } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import ErrorBage from '../error-bage/error-bage';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrederDetails from '../order-details/order-details';
import { getIngerdients } from '../../utils/burger-api';

export const BUN = 'Булки';
export const SAUCE = 'Соусы';
export const MAIN = 'Начинки';

const App = () => {
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [ingredient, setIngredient] = useState(null);

  const [burger, setBurger] = useState({
    top: '',
    bottom: '',
    rest: [],
  });

  const [order, setOrder] = useState(null);

  const handleOpenModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setVisible(false);
    setIngredient(null);
    setOrder(null);
  }, []);

  const handleOnIngredientClick = useCallback(
    (ingredient) => {
      setIngredient(ingredient);
      handleOpenModal();
    },
    [handleOpenModal]
  );

  const handleOnCheckout = useCallback(() => {
    setOrder({ orderId: '034536' });
    handleOpenModal();
  }, [handleOpenModal]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getIngerdients();
        setData(response);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (burger.top === '') {
      if (data !== null) {
        const topId = data.find((element) => element.type === 'bun')._id;
        const bottomId = data.find((element) => element.type === 'bun')._id;
        const restIds = [];
        for (const element of data) {
          if (element.type === 'sause' || element.type === 'main') {
            restIds.push(element._id);
          }
        }
        setBurger({
          ...burger,
          top: topId,
          bottom: bottomId,
          rest: restIds,
        });
      }
    }
  }, [burger, data]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {isError && <ErrorBage isError={isError} />}
      <main className={styles.main}>
        {!loading && data ? (
          <>
            <BurgerIngredients
              handleOnIngredientClick={handleOnIngredientClick}
              handleCloseModal={handleCloseModal}
              visible={visible}
              data={data}
            />
            <BurgerConstructor
              burger={burger}
              data={data}
              onCheckout={handleOnCheckout}
            />
          </>
        ) : null}
      </main>
      {visible && ingredient && (
        <Modal onClose={handleCloseModal} hasTitle={true}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
      {visible && order && (
        <Modal onClose={handleCloseModal} hasTitle={false}>
          <OrederDetails order={order} />
        </Modal>
      )}
    </div>
  );
};

export default App;
