import React, { useEffect, useState } from "react";

import Input from "./UI/Input";
import ConverterActions from "./ConverterActions";
import styles from "./Converter.module.css";
import ConverterResults from "./ConverterResults";
import Chart from "./Chart";
import ErrorPage from "./Error";
import { calculateExchangeRate, convertCurrency } from "../utils/converter";

const Converter = ({
  isLoading,
  error,
  data,
  value,
  setValue,
  selectedChartValue,
  setSelectedChartValue,
  selectedCurrencies,
  setSelectedCurrencies,
}) => {
  if (error) return <ErrorPage error={error} />;

  const [result, setResult] = useState({ rate: null, value: null });

  const calculate = () => {
    if (isLoading) {
      setResult({ rate: null, value: null });
      return;
    }

    const rate = calculateExchangeRate(
      selectedCurrencies.baseCurrency,
      selectedCurrencies.currency,
      data
    );
    setResult({
      rate,
      value: convertCurrency(+value, rate),
    });
  };

  useEffect(() => {
    calculate();
  }, [selectedCurrencies]);

  return (
    <div className={styles.converter}>
      <Input
        currency={selectedCurrencies.baseCurrency}
        value={value}
        setValue={setValue}
        onCalculate={calculate}
      />
      <ConverterActions
        selectedCurrencies={selectedCurrencies}
        setSelectedCurrencies={setSelectedCurrencies}
        onCalculate={calculate}
      />
      <ConverterResults
        result={result}
        baseCurrency={selectedCurrencies.baseCurrency}
        currency={selectedCurrencies.currency}
        isLoading={isLoading}
      />
      <Chart
        selectedCurrencies={selectedCurrencies}
        selectedValue={selectedChartValue}
        setSelectedValue={setSelectedChartValue}
      />
    </div>
  );
};

export default Converter;
