import React from "react";

import styles from "./ConverterActions.module.css";
import exchangeImage from "../assets/round-arrows.svg";
import CurrencySelect from "./UI/CurrencySelect.jsx";

const ConverterActions = ({
  selectedCurrencies,
  setSelectedCurrencies,
  onCalculate,
}) => {
  const handleSwap = (event) => {
    setSelectedCurrencies((prevState) => ({
      baseCurrency: prevState.currency,
      currency: prevState.baseCurrency,
    }));

    const img = event.target;
    if (img.tagName === "IMG") {
      img.animate([{ transform: "rotate(-180deg)", offset: 1 }], {
        duration: 350,
        easing: "ease-out",
      });
    }
  };

  return (
    <div className={styles["converter-actions"]}>
      <CurrencySelect
        selectedCurrency={selectedCurrencies.baseCurrency}
        setSelectedCurrency={(value) => {
          setSelectedCurrencies((prevState) => ({
            ...prevState,
            baseCurrency: value,
          }));
        }}
        disabledCurrency={selectedCurrencies.currency}
      />

      <button className={styles["btn-exchange"]} onClick={handleSwap}>
        <img src={exchangeImage} alt="Swap arrows" />
        to
      </button>

      <CurrencySelect
        selectedCurrency={selectedCurrencies.currency}
        setSelectedCurrency={(value) => {
          setSelectedCurrencies((prevState) => ({
            ...prevState,
            currency: value,
          }));
        }}
        disabledCurrency={selectedCurrencies.baseCurrency}
      />
      <button className={styles["btn-calculate"]} onClick={onCalculate}>
        GO
      </button>
    </div>
  );
};

export default ConverterActions;
