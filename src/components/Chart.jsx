import React from "react";
import ApexChart from "./ApexChart";

import styles from "./Chart.module.css";
import { useGetHistoricalRates } from "../hooks/useGetHistoricalRates";
import { getPrevDate } from "../utils";

const OPTIONS = [30, 60, 90];

const Chart = ({ selectedCurrencies, selectedValue, setSelectedValue }) => {
  const { isLoading, error, data } = useGetHistoricalRates(
    selectedCurrencies.baseCurrency,
    selectedCurrencies.currency
  );

  let dataPoints = [];

  if (data && data.results && !isLoading) {
    const dateFrom = getPrevDate(selectedValue);

    for (let item of data.results) {
      if (item.x >= dateFrom) dataPoints.push(item);
    }
  }

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <>
      <div className={styles.radioGroup}>
        {OPTIONS.map((option) => (
          <label className={styles.radioContainer} key={option}>
            <input
              type="radio"
              value={option}
              id={option}
              checked={selectedValue === option}
              onChange={() => handleRadioChange(option)}
            />
            <span className={styles.checkmark}></span>
            <span className={styles.text}>{option} days</span>
          </label>
        ))}
      </div>
      <ApexChart data={dataPoints} isLoading={isLoading} error={error} />
    </>
  );
};

export default Chart;
