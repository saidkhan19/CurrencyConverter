import React, { useRef, useState } from "react";

import styles from "./Input.module.css";
import { isNumeric } from "../../utils";

const Input = ({ currency, value, setValue, onCalculate, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef();

  function handleFocus() {
    inputRef.current.value = value;
    setIsFocused(true);
  }

  function handleBlur() {
    inputRef.current.value = "";
    setIsFocused(false);
    if (error) setError(false);
  }

  function handleInputChange(event) {
    const value = event.target.value;

    if (isNumeric(value) || value === "") {
      if (error) setError(false);
      setValue(value);
    } else {
      setError(true);
    }
  }

  return (
    <>
      <div className={styles["input-container"]}>
        <input
          size={10}
          type="text"
          {...props}
          ref={inputRef}
          onChange={handleInputChange}
          onKeyUp={(e) => (e.key === "Enter" ? onCalculate() : undefined)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {!isFocused && (
          <div
            className={styles.overlay}
            onClick={() => inputRef.current.focus()}
          >
            {value && value !== "" ? (
              <>
                <span>{value}</span>
                <span className={styles.code}>{currency}</span>
              </>
            ) : (
              <span>Value</span>
            )}
          </div>
        )}
      </div>
      {error && <p className={styles.error}>Type in a valid number please .</p>}
    </>
  );
};

export default Input;
