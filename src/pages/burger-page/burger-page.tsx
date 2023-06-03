import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './burger-page.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import Modal from '../../components/modal/modal';
import ErrorBage from '../../components/error-bage/error-bage';
import LoadingBage from '../../components/loading-bage/loading-bage';
import OrederDetails from '../../components/order-details/order-details';
import { getIngredientsState } from '../../services/burger-ingredients/burger-ingredients-selector';
import { getUiState } from '../../services/ui/ui-selectors';
import { hideOrderDetails } from '../../services/ui/ui-actions';

const BurgerPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(getIngredientsState);
  const { orderIsShown } = useSelector(getUiState);

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
      {orderIsShown && (
        <Modal handleModalClose={() => dispatch(hideOrderDetails())}>
          <OrederDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerPage;
