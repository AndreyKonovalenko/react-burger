import { useState, useEffect } from 'react';
import styles from './constructor-container.module.css';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';

// import { data } from '../../utils/data';
import Modal from '../modal/modal';

export const BUN = 'Булки';
export const SAUCE = 'Соусы';
export const MAIN = 'Начинки';
const URL = 'https://norma.nomoreparties.space/api/ingredients';

const ConstructorContainer = () => {
  const [current, setCurrent] = useState(BUN);
  const [visible, setVisible] = useState(false);
  const [burger, setBurger] = useState({
    top: '60d3b41abdacab0026a733c6',
    bottom: '60d3b41abdacab0026a733c6',
    rest: [
      '60d3b41abdacab0026a733c8',
      '60d3b41abdacab0026a733c8',
      '60d3b41abdacab0026a733c8',
    ],
  });
  const [data, setData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabSelect = (value) => {
    setCurrent(value);
    const element = document.getElementById(value);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenModal = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    console.log(data, isLoading);
    const fetchData = (url) => {
      setIsLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          setHasError(true);
          isLoading(false);
          console.log(e);
        });
    };

    if (data === null && isLoading === false) {
      fetchData(URL);
    }
  }, [data, isLoading]);

  return (
    <main className={styles.main}>
      {data && isLoading === false ? (
        <>
          <BurgerIngredients
            handleTabSelect={handleTabSelect}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            visible={visible}
            current={current}
            data={data}
          />
          <BurgerConstructor burger={burger} data={data} />
        </>
      ) : null}
      {visible && <Modal onClose={handleCloseModal} />}
    </main>
  );
};

export default ConstructorContainer;
