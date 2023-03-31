import Ingredient from './ingredient/ingredient';
import TabBar from './tab-bar/tab-bar';
import Collection from './collection/collection';
import styles from './burger-ingredients.module.css';

import { BUN, SAUCE, MAIN } from '../constructor-container';

const BurgerIngredients = ({ handleTabSelect, current, data }) => {
  const splitterToColumn = (data, type) => {
    const left = [];
    const right = [];
    const filtered = data.filter((ingredient) => ingredient.type === type);
    filtered.forEach((element, index) => {
      if (index % 2 === 0) {
        left.push(<Ingredient key={element._id} data={element} />);
      } else {
        right.push(<Ingredient key={element._id} data={element} />);
      }
    });
    return { left, right };
  };

  const bun = splitterToColumn(data, 'bun');
  const sauce = splitterToColumn(data, 'sauce');
  const main = splitterToColumn(data, 'main');

  return (
    <div className={styles.container}>
      <div className='pb-5 pt-10'>
        <span className='text text_type_main-large'>Собирите бургер</span>
      </div>
      <TabBar current={current} onClick={handleTabSelect} />
      <div className={styles.scrollbar}>
        <Collection headline={BUN} columns={bun} />
        <Collection headline={SAUCE} columns={sauce} />
        <Collection headline={MAIN} columns={main} />
      </div>
    </div>
  );
};
export default BurgerIngredients;
