import ElementContainer from './element-container/element-container';
import Checkout from './checkout/checkout';
import styles from './burger-constructor.module.css';
const BurgerConstructor = ({ burger }) => {
  return (
    <div className={styles.container}>
      <ElementContainer burger={burger} />
      <Checkout />
    </div>
  );
};
export default BurgerConstructor;
