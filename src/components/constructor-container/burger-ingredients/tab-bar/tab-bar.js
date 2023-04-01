import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BUN, SAUCE, MAIN } from '../../constructor-container';
import styles from './tab-bar.module.css';

const TabBar = ({ current, onClick }) => {
  return (
    <div className={`${styles.tabBar} mb-10`}>
      <Tab value={BUN} active={current === BUN} onClick={onClick}>
        {BUN}
      </Tab>
      <Tab value={SAUCE} active={current === SAUCE} onClick={onClick}>
        {SAUCE}
      </Tab>
      <Tab value={MAIN} active={current === MAIN} onClick={onClick}>
        {MAIN}
      </Tab>
    </div>
  );
};

export default TabBar;
