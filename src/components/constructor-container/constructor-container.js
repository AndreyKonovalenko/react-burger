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
  };

  handleTabSelect = (vlue) => {
    this.setState({ current: vlue });
  };

  render() {
    const { current } = this.state;
    return (
      <main className={styles.main}>
        <BurgerIngredients
          handleTabSelect={this.handleTabSelect}
          current={current}
          data={data}
        />
        <BurgerConstructor />
      </main>
    );
  }
}

export default ConstructorContainer;
