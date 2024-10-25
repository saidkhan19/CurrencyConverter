import React from "react";

import ErrorPage from "./Error";
import styles from "./Rates.module.css";
import { LoadingIndicator } from "./UI/LoadingIndicator";
import { CURRENCIES } from "../currencies";

const tickers = ["EUR", "JPY", "GBP", "RUB", "KGS", "UZS"].map((item) =>
  CURRENCIES.find((currency) => currency.value === item)
);

const Rates = ({ isLoading, error, data }) => {
  if (error) return <ErrorPage error={error} />;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <table className={styles.rates}>
      <tbody>
        {tickers.map((item) => (
          <tr key={item.value}>
            <td className={styles.ticker}>
              <img src="https://flagcdn.com/us.svg" alt="Flag" />
              <span>USD / </span>
              <img src={item.flag} alt="Flag" />
              <span>{item.value}</span>
            </td>
            <td className={styles.value}>
              {data[item.value].value.toFixed(3)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Rates;
