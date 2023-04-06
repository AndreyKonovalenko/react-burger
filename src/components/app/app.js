import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";

export const BUN = "Булки";
export const SAUCE = "Соусы";
export const MAIN = "Начинки";

const URL = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
  const [current, setCurrent] = useState(BUN);
  const [visible, setVisible] = useState(false);
  const [ingredients, setIngredietns] = useState({
    data: null,
    isLoading: false,
    isError: false,
  });
  const [burger, setBurger] = useState({
    top: null,
    bottom: null,
    rest: [],
  });

  const { data, isLoading, isError } = ingredients;

  const handleTabSelect = (value) => {
    setCurrent(value);
    const element = document.getElementById(value);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenModal = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    const fetchIngredients = async (url) => {
      setIngredietns((ingredients) => ({ ...ingredients, isLoading: true }));
      try {
        const res = await fetch(url);
        const data = await res.json();
        setIngredietns((ingredients) => ({
          ...ingredients,
          data: data.data,
          isLoading: false,
        }));
      } catch (err) {
        setIngredietns((ingredients) => ({
          ...ingredients,
          isLoading: false,
          isError: true,
        }));
        console.log(err);
      }
    };

    fetchIngredients(URL);
  }, []);

  useEffect(() => {
    if (burger.top === null) {
      if (data !== null) {
        const topId = data.find((element) => element.type === "bun")._id;
        const bottomId = data.find((element) => element.type === "bun")._id;
        const restIds = [];
        for (const element of data) {
          if (element.type === "sause" || element.type === "main") {
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
      </main>
      {visible && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
