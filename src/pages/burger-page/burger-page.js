import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import styles from "./burger-page.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Modal from "../../components/modal/modal";
import ErrorBage from "../../components/error-bage/error-bage";
import LoadingBage from "../../components/loading-bage/loading-bage";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import OrederDetails from "../../components/order-details/order-details";
import { loadIngerdients } from "../../services/burger-ingredients/burger-ingredients-actions";
import { getIngredientsState } from "../../services/burger-constructor/burger-constructor-selectors";
import { getUiState } from "../../services/ui/ui-selectors";

const BurgerPage = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(getIngredientsState);
  const { ingredient, orderIsShown } = useSelector(getUiState);

  useEffect(() => {
    dispatch(loadIngerdients());
  }, [dispatch]);

  const content = (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );

  return (
    <>
      <main className={styles.container}>
        {!loading ? (
          Boolean(error) ? (
            <ErrorBage error={error} />
          ) : (
            content
          )
        ) : (
          <LoadingBage />
        )}
      </main>
      {ingredient && (
        <Modal hasTitle={true}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
      {orderIsShown && (
        <Modal hasTitle={false}>
          <OrederDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerPage;
