import { useState, useCallback, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import Ingredient from './ingredient/ingredient';
import TabBar from './tab-bar/tab-bar';
import Collection from './collection/collection';
import styles from './burger-ingredients.module.css';
import { IngredientsContext } from '../../services/appContex';
import { BUN, SAUCE, MAIN } from '../app/app';

const BurgerIngredients = ({ handleOnIngredientClick }) => {
  const { data } = useContext(IngredientsContext);
  const [current, setCurrent] = useState(BUN);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const handleTabSelect = useCallback((value) => {
    setCurrent(value);
    switch (value) {
      case BUN:
        bunRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case SAUCE:
        sauceRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case MAIN:
        mainRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        bunRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const splitterToColumn = (data, type) => {
    const left = [];
    const right = [];
    const filtered = data.filter((ingredient) => ingredient.type === type);
    filtered.forEach((element, index) => {
      if (index % 2 === 0) {
        left.push(
          <Ingredient
            key={element._id}
            data={element}
            handleOnIngredientClick={handleOnIngredientClick}
          />
        );
      } else {
        right.push(
          <Ingredient
            key={element._id}
            data={element}
            handleOnIngredientClick={handleOnIngredientClick}
          />
        );
      }
    });
    return { left, right };
  };

  const bun = data ? splitterToColumn(data, 'bun') : null;
  const sauce = data ? splitterToColumn(data, 'sauce') : null;
  const main = data ? splitterToColumn(data, 'main') : null;

  return (
    <div className={styles.container}>
      <div className='pb-5 pt-10'>
        <span className='text text_type_main-large'>Соберите бургер</span>
      </div>
      <TabBar current={current} onClick={handleTabSelect} />
      <div className={styles.scrollbar}>
        <Collection headline={BUN} columns={bun} collectionRef={bunRef} />
        <Collection headline={SAUCE} columns={sauce} collectionRef={sauceRef} />
        <Collection headline={MAIN} columns={main} collectionRef={mainRef} />
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  handleOnIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
