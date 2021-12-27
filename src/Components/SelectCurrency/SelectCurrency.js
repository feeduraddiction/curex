import React from "react";
import './SelectCurrency.css'

const SelectCurrency = ({ onGetCurrencyToAdd, currencyData }) => {
  const addCurrencyHandler = (event) => {
    onGetCurrencyToAdd(event.target.value);
  };

  return (
    <select className="select-currency" onChange={addCurrencyHandler}>
        <option defaultValue disabled>Add currency</option>
      {Object.keys(currencyData).map((currency) => (
        <option key={currency}>{currency}</option>
      ))}
    </select>
  );
};
 
export default SelectCurrency;
