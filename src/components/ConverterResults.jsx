import React from "react";

import styles from "./ConverterResults.module.css";
import { LoadingIndicator } from "./UI/LoadingIndicator";

const ConverterResults = ({ result, baseCurrency, currency, isLoading }) => {
  if (result.value) {
    return (
      <div>
        <p className={styles.result}>
          {result.value.toFixed(2)} <span>{currency}</span>
        </p>
        <p className={styles.rate}>
          {`1 ${baseCurrency} = ${result.rate.toFixed(2)} ${currency}`}
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 98.41 }}>{isLoading && <LoadingIndicator />}</div>
  );
};

export default ConverterResults;
