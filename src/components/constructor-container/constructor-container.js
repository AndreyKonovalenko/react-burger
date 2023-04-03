import { useState, useEffect } from 'react';
import styles from './constructor-container.module.css';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';

// import { data } from '../../utils/data';
import Modal from '../modal/modal';

export const BUN = 'Булки';
export const SAUCE = 'Соусы';
export const MAIN = 'Начинки';
// const defaultBurger = {
//   top: '60d3b41abdacab0026a733c6',
//   bottom: '60d3b41abdacab0026a733c6',
//   rest: [
//     '60d3b41abdacab0026a733c8',
//     '60d3b41abdacab0026a733c8',
//     '60d3b41abdacab0026a733c8',
//   ],
// };

const defaultBurger = {
  top: '',
  bottom: '',
  rest: ['60d3b41abdacab0026a733c8'],
};

const URL = 'https://norma.nomoreparties.space/api/ingredients';

const ConstructorContainer = () => {
  const [current, setCurrent] = useState(BUN);
  const [visible, setVisible] = useState(false);
  const [burger, setBurger] = useState(defaultBurger);
  const [ingredients, setIngredietns] = useState({
    data: null,
    isLoading: false,
    isError: false,
  });
  const { data, isLoading, isError } = ingredients;

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
    console.log(ingredients);
    const fetchIngredients = async (url) => {
      setIngredietns({ ...ingredients, isLoading: true });
      try {
        const res = await fetch(url);
        const data = await res.json();
        setIngredietns({ data: data.data, isLoading: false });
      } catch (err) {
        setIngredietns({ isLoading: false, isError: true });
        console.log(err);
      }
    };

    fetchIngredients(URL);
  }, []);

  return (
    <main className={styles.main}>
      {data !== null && isLoading === false ? (
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
