import { useState, useEffect, useCallback } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import ErrorBage from '../error-bage/error-bage';

export const BUN = 'Булки';
export const SAUCE = 'Соусы';
export const MAIN = 'Начинки';

const URL = 'https://norma.nomoreparties.space/api/ingredients';
const App = () => {
  const [current, setCurrent] = useState(BUN);
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [ingredient, setIngredient] = useState(null);

  const [burger, setBurger] = useState({
    top: null,
    bottom: null,
    rest: [],
  });

  const handleTabSelect = useCallback((value) => {
    setCurrent(value);
    const element = document.getElementById(value);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  const handleOnIngredientClick = useCallback(
    (ingredient) => {
      console.log(ingredient);
      setIngredient(ingredient);
      handleOpenModal();
    },
    [handleOpenModal]
  );

  useEffect(() => {
    const fetchIngredients = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}`);
        }
        const ingredients = await response.json();
        setData(ingredients.data);
        setIsError(null);
      } catch (err) {
        setIsError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients(URL);
  }, []);

  useEffect(() => {
    if (burger.top === null) {
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
              handleTabSelect={handleTabSelect}
              handleOnIngredientClick={handleOnIngredientClick}
              handleCloseModal={handleCloseModal}
              visible={visible}
              current={current}
              data={data}
            />
            <BurgerConstructor burger={burger} data={data} />
          </>
        ) : null}
      </main>
      {visible && <Modal onClose={handleCloseModal} ingredient={ingredient} />}
    </div>
  );
};

export default App;
