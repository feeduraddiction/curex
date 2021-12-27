import './App.css';
import React, { useEffect } from 'react';
import SelectCurrency from './Components/SelectCurrency/SelectCurrency';
import CurrencyInput from './Components/CurrencyInput/CurrencyInput';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencies } from './store/currency-slice';
import { getCurrenciesToDisplay } from './store/currenciesToDisplay-slice';

function App() {
  const dispatch = useDispatch();
  const currencyData = useSelector(state => state.currencies.items);
  const currenciesToDisplay = useSelector(state => state.currenciesToDisplay.items);

  useEffect(() => {
    dispatch(getCurrencies());
    dispatch(getCurrenciesToDisplay())
  }, [dispatch])

  const addCurrencyHandler = (newCurrency) => {
    fetch('http://localhost:3002/filtered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ currencyToChange: newCurrency, codeOfMethod: 1 }),
    })
    dispatch(getCurrenciesToDisplay());
  };

  const changeValueHandler = (changedValue, currencyName) => {
    fetch('http://localhost:3002/filtered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ valueAfterChange: changedValue, currencyToChange: currencyName, codeOfMethod: 2 }),
    })
    dispatch(getCurrenciesToDisplay());
  }

  return (
    <div className="App">
      <h1>International Currencies rate</h1>
      {Object.entries(currenciesToDisplay).map(([key, value]) => (
          <CurrencyInput 
          key={key}
          currencyTitle={key}
          currencyValue={value}
          OnChangeValue={(valueToChange) => changeValueHandler(valueToChange, key)} />
      ))}
      <SelectCurrency
        onGetCurrencyToAdd={addCurrencyHandler}
        currencyData={currencyData}
      />
    </div>
  );
}

export default App;
