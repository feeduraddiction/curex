import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencies } from './store/currency-slice';
import { getCurrenciesToDisplay } from './store/currenciesToDisplay-slice';

function App() {
  const dispatch = useDispatch();
  const currencyData = useSelector(state => state.currencies.items);
  const currenciesToDisplay = useSelector(state => state.currenciesToDisplay.items);
  console.log(currenciesToDisplay, 'toDisplay');

  useEffect(() => {
    dispatch(getCurrencies());
    dispatch(getCurrenciesToDisplay())
  }, [dispatch])

  const addCurrencyHandler = (event) => {
    console.log(event.target.value, 'event')
    fetch('http://localhost:3002/filtered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ currencyToChange: event.target.value, codeOfMethod: 1 }),
    })
        dispatch(getCurrenciesToDisplay());

  };

  const changeValueHandler = (event, currencyName) => {
    console.log(event.target.value, currencyName, 'changes');
    fetch('http://localhost:3002/filtered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ valueAfterChange: event.target.value, currencyToChange: currencyName, codeOfMethod: 2 }),
    })
        dispatch(getCurrenciesToDisplay());

  }

  return (
    <div className="App">
      {Object.entries(currenciesToDisplay).map(([key, value]) => (
        <div>
          <input type="number" inputMode="decimal" onChange={(event) => changeValueHandler(event, key)} value={Math.floor(value * 10000) / 10000}>
          </input>
          {key}
        </div>
      ))}
      <select onChange={addCurrencyHandler}>
        {Object.keys(currencyData).map(currency => (
          <option>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
