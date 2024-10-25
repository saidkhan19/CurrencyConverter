import React from "react";
import Select from "react-select";

import { CURRENCIES } from "../../currencies.js";
import styles from "./CurrencySelect.module.css";

const formatOptionLabel = ({ value, label, flag }, meta) => {
  if (meta.context === "value")
    return <span className={styles["select-value"]}>{value}</span>;

  return (
    <div className={styles["select-menu-option"]}>
      <img src={flag} alt={label} />
      <div>{label}</div>
    </div>
  );
};

const CurrencySelect = ({
  selectedCurrency,
  setSelectedCurrency,
  disabledCurrency,
}) => {
  return (
    <Select
      options={CURRENCIES}
      value={CURRENCIES.find((item) => item.value === selectedCurrency)}
      onChange={(option) => setSelectedCurrency(option.value)}
      isOptionDisabled={(option) => option.value === disabledCurrency}
      components={{
        IndicatorSeparator: () => null,
      }}
      classNamePrefix="react-select"
      formatOptionLabel={formatOptionLabel}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: "none",
          flexDirection: "row-reverse",
        }),
        valueContainer: (baseStyles, state) => ({
          ...baseStyles,
          width: "3.4rem",
          paddingLeft: "0",
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
          paddingRight: "2px",
        }),
        menu: (baseStyles, state) => ({
          ...baseStyles,
          width: "fit-content",
        }),
      }}
    />
  );
};

export default CurrencySelect;
