import PropTypes from "prop-types";
import styles from "./nav-item.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BURGER_CONSTRUCTOR, ORDER_FEED, USER_ACCOUNT } from "../app-header";

const NavItem = ({ option, isActive, onClick }) => {
  const icontSelection = (option) => {
    switch (option) {
      case BURGER_CONSTRUCTOR:
        return <BurgerIcon type={isActive ? "primary" : "secondary"} />;
      case ORDER_FEED:
        return <ListIcon type={isActive ? "primary" : "secondary"} />;
      case USER_ACCOUNT:
        return <ProfileIcon type={isActive ? "primary" : "secondary"} />;
      default:
        console.log("Что-то пошло не так!");
    }
  };
  return (
    <div
      className={`${styles.item} pl-5 pr-5 pb-4 pt-4`}
      onClick={() => onClick(option)}
    >
      {icontSelection(option)}
      <p
        className={`${styles.text} text text_type_main-default${
          !isActive ? " text_color_inactive" : ""
        }`}
      >
        {option}
      </p>
    </div>
  );
};

NavItem.propTypes = {
  option: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NavItem;
