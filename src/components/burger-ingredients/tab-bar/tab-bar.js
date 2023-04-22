import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BUN, SAUCE, MAIN } from '../../../utils/ui-constants';
import styles from './tab-bar.module.css';
import { useSelector } from 'react-redux';

const TabBar = ({ onClick }) => {
  const { collection } = useSelector((state) => state.ui);
  return (
    <div className={`${styles.tabBar} mb-10`}>
      <Tab value={BUN} active={collection === BUN} onClick={onClick}>
        {BUN}
      </Tab>
      <Tab value={SAUCE} active={collection === SAUCE} onClick={onClick}>
        {SAUCE}
      </Tab>
      <Tab value={MAIN} active={collection === MAIN} onClick={onClick}>
        {MAIN}
      </Tab>
    </div>
  );
};

TabBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default TabBar;
