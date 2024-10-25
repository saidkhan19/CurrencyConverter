import React from "react";

import styles from "./LoadingIndicator.module.css";
import LoadingImg from "../../assets/spinner.svg";

export const LoadingIndicator = () => {
  return (
    <div className={styles.container}>
      <img src={LoadingImg} alt="Spinner" className={styles.indicator} />
    </div>
  );
};
