import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import appHeaderStyles from "./app-header.module.css";

class AppHeader extends React.Component {
  render() {
    return (
      <div
        style={{ backgroundColor: "#0B5FFF", color: "white" }}
        className="p-4"
      >
        <div className={appHeaderStyles.content}>
          <Logo />
        </div>
      </div>
    );
  }
}

export default AppHeader;
