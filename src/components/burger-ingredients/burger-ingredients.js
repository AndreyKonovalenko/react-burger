import { useState, useCallback, useRef } from 'react';
import Ingredient from './ingredient/ingredient';
import TabBar from './tab-bar/tab-bar';
import Collection from './collection/collection';
import styles from './burger-ingredients.module.css';
import { BUN, SAUCE, MAIN } from '../../utils/ui-constants';
import { useSelector } from 'react-redux';

const BurgerIngredients = () => {
  const { ingredients } = useSelector((state) => state.ingredients);
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

  const splitterToColumn = (ingredients, type) => {
    const left = [];
    const right = [];
    const filtered = ingredients.filter(
      (ingredient) => ingredient.type === type
    );
    filtered.forEach((element, index) => {
      if (index % 2 === 0) {
        left.push(<Ingredient key={element._id} {...element} />);
      } else {
        right.push(<Ingredient key={element._id} {...element} />);
      }
    });
    return { left, right };
  };

  const bun = splitterToColumn(ingredients, 'bun');
  const sauce = splitterToColumn(ingredients, 'sauce');
  const main = splitterToColumn(ingredients, 'main');

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

export default BurgerIngredients;
