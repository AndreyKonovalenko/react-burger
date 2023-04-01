import React from 'react';
import styles from './constructor-container.module.css';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import { data } from '../../utils/data';

export const BUN = 'Булки';
export const SAUCE = 'Соусы';
export const MAIN = 'Начинки';

class ConstructorContainer extends React.Component {
  state = {
    current: BUN,
    burger: {
      top: '60666c42cc7b410027a1a9b1',
      bottom: '60666c42cc7b410027a1a9b1',
      rest: [
        '60666c42cc7b410027a1a9b5',
        '60666c42cc7b410027a1a9b6',
        '60666c42cc7b410027a1a9b7',
        '60666c42cc7b410027a1a9b4',
        '60666c42cc7b410027a1a9b9',
        '60666c42cc7b410027a1a9b8',
        '60666c42cc7b410027a1a9bc',
        '60666c42cc7b410027a1a9bb',
      ],
    },
  };

  handleTabSelect = (value) => {
    this.setState({ current: value });
    const element = document.getElementById(value);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  render() {
    const { current, burger } = this.state;
    return (
      <main className={styles.main}>
        <BurgerIngredients
          handleTabSelect={this.handleTabSelect}
          current={current}
          data={data}
        />
        <BurgerConstructor burger={burger} data={data} />
      </main>
    );
  }
}

export default ConstructorContainer;
