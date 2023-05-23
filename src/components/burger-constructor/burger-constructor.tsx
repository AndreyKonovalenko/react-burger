import Burger from './burger/burger';
import Checkout from './checkout/checkout';
import styles from './burger-constructor.module.css';
const BurgerConstructor = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Burger />
      <Checkout />
    </div>
  );
};

export default BurgerConstructor;
