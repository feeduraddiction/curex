import React from "react";
import './CurrencyInput.css';

const CurrencyInput = ({ OnChangeValue, currencyTitle, currencyValue }) => {
  const changeValueHandler = (event) => {
    OnChangeValue(event.target.value);
  };

  return (
    <div className="currency-input">
      <input
        id="inputCurrency"
        type="number"
        inputMode="decimal"
        onChange={changeValueHandler}
        value={(Math.floor(currencyValue * 10000) / 10000)}>
      </input>
      <label htmlFor="inputCurrency" className="currency-input__title">{currencyTitle}</label>
    </div>
  );
};

export default CurrencyInput;