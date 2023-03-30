import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './ingredient/ingredient';
import styles from './burger-ingredients.module.css';

import { BUN, SAUCE, MAIN } from '../constructor-container';
const BurgerIngredients = ({ handleTabSelect, current, data }) => {
  const splitter = (data, type) => {
    const firstColumn = [];
    const secondColumn = [];
    data.forEach((element, index) => {
      if (element.type === type) {
        if (index % 2 === 0) {
          firstColumn.push(<Ingredient key={element._id} data={element} />);
        } else {
          secondColumn.push(<Ingredient key={element._id} data={element} />);
        }
      }
    });
    return { firstColumn, secondColumn };
  };

  const bun = splitter(data, 'bun');
  const sauce = splitter(data, 'sauce');
  const main = splitter(data, 'main');

  return (
    <div className={styles.container}>
      <div className='pb-5 pt-10'>
        <span className={`${styles.heading} text text_type_main-large`}>
          Собирите бургер
        </span>
      </div>
      <div className={styles.toolBar}>
        <Tab value={BUN} active={current === BUN} onClick={handleTabSelect}>
          {BUN}
        </Tab>
        <Tab value={SAUCE} active={current === SAUCE} onClick={handleTabSelect}>
          {SAUCE}
        </Tab>
        <Tab value={MAIN} active={current === MAIN} onClick={handleTabSelect}>
          {MAIN}
        </Tab>
      </div>
      <>
        <span>{BUN}</span>
        <div className={styles.typeContainer}>
          <div className={styles.column}>{bun.firstColumn}</div>
          <div className={styles.column}>{bun.secondColumn}</div>
        </div>
      </>
      <>
        <span>{SAUCE}</span>
        <div className={styles.typeContainer}>
          <div className={styles.column}>{sauce.firstColumn}</div>
          <div className={styles.column}>{sauce.secondColumn}</div>
        </div>
      </>
      <>
        <span>{MAIN}</span>
        <div className={styles.typeContainer}>
          <div className={styles.column}>{main.firstColumn}</div>
          <div className={styles.column}>{main.secondColumn}</div>
        </div>
      </>
    </div>
  );
};
export default BurgerIngredients;
