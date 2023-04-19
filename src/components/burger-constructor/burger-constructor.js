import ElementContainer from './element-container/element-container';
import Checkout from './checkout/checkout';
import styles from './burger-constructor.module.css';
const BurgerConstructor = () => {
  return (
    <div className={styles.container}>
      <ElementContainer />
      <Checkout />
    </div>
  );
};

export default BurgerConstructor;
