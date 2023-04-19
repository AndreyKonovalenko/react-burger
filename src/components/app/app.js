import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import ErrorBage from '../error-bage/error-bage';
import LoadingBage from '../loading-bage/loading-bage';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrederDetails from '../order-details/order-details';
import { loadIngerdients } from '../../services/burger-ingredients/burger-ingredients-actions';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const App = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.ingredients);
  const { ingredient, orderIsShown } = useSelector((state) => state.ui);

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
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
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
    </div>
  );
};

export default App;
