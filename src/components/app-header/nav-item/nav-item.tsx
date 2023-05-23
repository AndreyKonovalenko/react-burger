import { NavLink } from 'react-router-dom';
import styles from './nav-item.module.css';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_CONSTRUCTOR, ORDER_FEED, USER_ACCOUNT } from '../../../utils/ui-constants';

type TNavItemProps = {
  option: string;
  to: string;
}

const NavItem = ({option, to}: TNavItemProps): JSX.Element => {
  const icontSelection = (option: string, isActive: boolean) => {
    switch (option) {
      case BURGER_CONSTRUCTOR:
        return <BurgerIcon type={isActive ? 'primary' : 'secondary'} />;
      case ORDER_FEED:
        return <ListIcon type={isActive ? 'primary' : 'secondary'} />;
      case USER_ACCOUNT:
        return <ProfileIcon type={isActive ? 'primary' : 'secondary'} />;
      default:
        console.log('Что-то пошло не так!');
    }
  };
  return (
    <NavLink className={`${styles.item} pl-5 pr-5 pb-4 pt-4`} to={to}>
      {({ isActive }) => {
        return (
          <>
            {icontSelection(option, isActive)}
            <p
              className={
                isActive
                  ? 'text text_type_main-default'
                  : 'text text_type_main-default text_color_inactive'
              }>
              {option}
            </p>
          </>
        );
      }}
    </NavLink>
  );
};

export default NavItem;
