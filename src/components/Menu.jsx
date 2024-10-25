import React from "react";

import styles from "./Menu.module.css";
import triangleIndicator from "../assets/triangle.svg";

const Menu = ({ active, onChange }) => {
  function getClasses(page) {
    return (
      styles["navbar-list-item"] + " " + (active === page ? styles.active : "")
    );
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles["navbar-list"]}>
        <li
          className={getClasses("converter")}
          onClick={() => onChange("converter")}
        >
          Converter
          <img
            src={triangleIndicator}
            className={styles["active-item-indicator"]}
          />
        </li>
        <div className={styles["navbar-seperator"]}></div>
        <li className={getClasses("rates")} onClick={() => onChange("rates")}>
          Rates
          <img
            src={triangleIndicator}
            className={styles["active-item-indicator"]}
          />
        </li>
        <div className={styles["navbar-seperator"]}></div>
        <li className={getClasses("info")} onClick={() => onChange("info")}>
          Info
          <img
            src={triangleIndicator}
            className={styles["active-item-indicator"]}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
