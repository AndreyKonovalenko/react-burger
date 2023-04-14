import { useState, useEffect, useCallback, useReducer } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import ErrorBage from '../error-bage/error-bage';
import LoadingBage from '../loading-bage/loading-bage';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrederDetails from '../order-details/order-details';
import { getIngerdients } from '../../utils/burger-api';
import { IngredientsContext, BurgerContext } from '../../services/appContex';
import burgerReducer from '../../services/burgerReducer';
import * as actionTypes from '../../services/actionTypes';

export const BUN = 'Булки';
export const SAUCE = 'Соусы';
export const MAIN = 'Начинки';

const App = () => {
  // Ingredients state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [ingredient, setIngredient] = useState(null);

  // Burger state
  const burgerInitialState = {
    bun: null,
    mainAndSauce: [],
    total: 0,
    order: [],
  };

  const [burgerState, burgerDispatcher] = useReducer(
    burgerReducer,
    burgerInitialState
  );

  const handleCloseModal = useCallback(() => {
    setIngredient(null);
    setOrderDetailsOpen(false);
  }, []);

  const handleOnIngredientClick = useCallback((ingredient) => {
    if (ingredient.type === 'bun') {
      burgerDispatcher({
        type: actionTypes.ADD_BUN,
        payload: { ingredientId: ingredient._id, price: ingredient.price },
      });
    } else {
      burgerDispatcher({
        type: actionTypes.ADD_MAIN_AND_SAUCE,
        payload: { ingredientId: ingredient._id, price: ingredient.price },
      });
    }
    setIngredient(ingredient);
  }, []);

  const handleOnCheckout = useCallback(() => {
    burgerDispatcher({ type: actionTypes.FILL_ORDER });
    setOrderDetailsOpen(true);
  }, []);

  // Component lifecycle hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getIngerdients();
        setData(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // JSX markup

  const content = (
    <>
      <BurgerIngredients
        handleOnIngredientClick={handleOnIngredientClick}
        handleCloseModal={handleCloseModal}
      />
      <BurgerConstructor onCheckout={handleOnCheckout} />
    </>
  );

  return (
    <div className={styles.app}>
      <IngredientsContext.Provider value={{ data }}>
        <BurgerContext.Provider value={{ burgerState, burgerDispatcher }}>
          <AppHeader />
          <main className={styles.main}>
            {!loading ? (
              error ? (
                <ErrorBage error={error} />
              ) : (
                content
              )
            ) : (
              <LoadingBage />
            )}
          </main>
          {ingredient && (
            <Modal onClose={handleCloseModal} hasTitle={true}>
              <IngredientDetails ingredient={ingredient} />
            </Modal>
          )}
          {orderDetailsOpen && (
            <Modal onClose={handleCloseModal} hasTitle={false}>
              <OrederDetails />
            </Modal>
          )}
        </BurgerContext.Provider>
      </IngredientsContext.Provider>
    </div>
  );
};

export default App;
