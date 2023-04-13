import { useState, useEffect, useCallback, useReducer } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import ErrorBage from "../error-bage/error-bage";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrederDetails from "../order-details/order-details";
import { getIngerdients } from "../../utils/burger-api";
import { IngredientsContext, BurgerContext } from "../../services/appContex";
import buregerReducer from "../../services/burgerReducer";
import * as actionTypes from "../../services/actionTypes";

export const BUN = "Булки";
export const SAUCE = "Соусы";
export const MAIN = "Начинки";

const App = () => {
  // Ingredients state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  // Modal state
  const [visible, setVisible] = useState(false);
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
    buregerReducer,
    burgerInitialState
  );

  // Event handlers
  const handleOpenModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setVisible(false);
    setIngredient(null);
  }, []);

  const handleOnIngredientClick = useCallback(
    (ingredient) => {
      if (ingredient.type === "bun") {
        burgerDispatcher({
          type: actionTypes.ADD_BUN,
          payload: { ingredientId: ingredient._id, price: ingredient.price },
        });
        burgerDispatcher({ type: actionTypes.CALCULATE_TOTAL });
        burgerDispatcher({ type: actionTypes.FILL_ORDER });
      } else {
        burgerDispatcher({
          type: actionTypes.ADD_MAIN_AND_SAUCE,
          payload: { ingredientId: ingredient._id, price: ingredient.price },
        });
        burgerDispatcher({ type: actionTypes.CALCULATE_TOTAL });
        burgerDispatcher({ type: actionTypes.FILL_ORDER });
      }
      setIngredient(ingredient);
      handleOpenModal();
    },
    [handleOpenModal]
  );

  const handleOnCheckout = useCallback(() => {
    setOrderDetailsOpen(true);
    handleOpenModal();
  }, [handleOpenModal]);

  // Component lifecycle hook
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

  // JSX markup
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
          {visible && orderDetailsOpen && (
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
