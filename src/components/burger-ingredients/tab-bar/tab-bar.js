import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BUN, SAUCE, MAIN } from '../../app/app';
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

TabBar.propTypes = {
  current: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TabBar;
