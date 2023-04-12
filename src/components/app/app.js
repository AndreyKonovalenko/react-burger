import { useState, useEffect, useCallback, useReducer } from 'react';
import uniqid from 'uniqid';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import ErrorBage from '../error-bage/error-bage';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrederDetails from '../order-details/order-details';
import { getIngerdients } from '../../utils/burger-api';
import { IngredientsContext, BurgerContext } from '../../services/appContex';
import * as actionTypes from '../../services/actionTypes';

export const BUN = 'Булки';
export const SAUCE = 'Соусы';
export const MAIN = 'Начинки';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const [visible, setVisible] = useState(false);

  const [ingredient, setIngredient] = useState(null);
  const burgerInitialState = { bun: null, mainAndSauce: [], total: 0 };

  const buregerReducer = (state, action) => {
    switch (action.type) {
      case actionTypes.ADD_BUN:
        return {
          ...state,
          bun: {
            id: uniqid(),
            ingredientId: action.payload.ingredientId,
            price: action.payload.price,
          },
        };
      case actionTypes.REMOVE_BUN:
        return { ...state, bun: null };
      case actionTypes.ADD_MAIN_AND_SAUCE:
        return {
          ...state,
          mainAndSauce: [
            ...state.mainAndSauce,
            {
              id: uniqid(),
              ingredientId: action.payload.ingredientId,
              price: action.payload.price,
            },
          ],
        };
      case actionTypes.REMOVE_MAIN_AND_SAUCE:
        return {
          ...state,
          mainAndSauce: state.mainAndSauce.filter(
            (element) => element.id !== action.payload
          ),
        };
      case actionTypes.CALCULATE_TOTAL:
        return {
          ...state,
          total:
            (state.mainAndSauce.length > 0
              ? state.mainAndSauce.reduce(
                  (acc, current) => acc + current.price,
                  0
                )
              : 0) + (state.bun ? state.bun.price * 2 : 0),
        };

      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };
  const [burgerState, burgerDispatcher] = useReducer(
    buregerReducer,
    burgerInitialState
  );

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
      if (ingredient.type === 'bun') {
        burgerDispatcher({
          type: actionTypes.ADD_BUN,
          payload: { ingredientId: ingredient._id, price: ingredient.price },
        });
        burgerDispatcher({ type: actionTypes.CALCULATE_TOTAL });
      } else {
        burgerDispatcher({
          type: actionTypes.ADD_MAIN_AND_SAUCE,
          payload: { ingredientId: ingredient._id, price: ingredient.price },
        });
        burgerDispatcher({ type: actionTypes.CALCULATE_TOTAL });
      }
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
    const fetchData = async () => {
      try {
        const response = await getIngerdients();
        setData(response);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <IngredientsContext.Provider value={{ data }}>
        <BurgerContext.Provider value={{ burgerState, burgerDispatcher }}>
          <AppHeader />
          {isError && <ErrorBage isError={isError} />}
          <main className={styles.main}>
            {!loading && data ? (
              <>
                <BurgerIngredients
                  handleOnIngredientClick={handleOnIngredientClick}
                  handleCloseModal={handleCloseModal}
                  visible={visible}
                />
                <BurgerConstructor onCheckout={handleOnCheckout} />
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
        </BurgerContext.Provider>
      </IngredientsContext.Provider>
    </div>
  );
};

export default App;
