import './App.css';
import React, { useState, useEffect } from 'react';
// import { ReactReduxContext } from 'react-redux';

const URL_EVERYTHING = 'http://localhost:3002';
const URL_FILTERED = 'http://localhost:3002/filtered';

function App() {
  const [currenciesAll, setCurrenciesAll] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const fetchData = async (url, setStateFunc) => {
    try {
      const response = await fetch(url);
      const json = await response.json()
      setStateFunc(json);
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(()=>{
    fetchData(URL_EVERYTHING, setCurrenciesAll);
    fetchData(URL_FILTERED, setCurrencies);
  },[])
  
  const addCurrencyHandler = (event) => {
    console.log(event.target.value, 'event')
    fetch('http://localhost:3002/filtered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({currencyToChange: event.target.value, codeOfMethod: 1}),
    })
      .then((request) => request.json()
        .then((json) => setCurrencies(json)));
  };
  
  const changeValueHandler = (event,currencyName) => {
      console.log(event.target.value, currencyName, 'changes');
      fetch('http://localhost:3002/filtered', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({valueAfterChange: event.target.value, currencyToChange: currencyName, codeOfMethod: 2}),
      })
        .then((request) => request.json()
          .then((json) => setCurrencies(json)));
      
  }
  
  return (
    <div className="App">
        {Object.entries(currencies).map(([key, value]) => (
          <div>
            <input type="number" inputMode="decimal" onChange={(event) => changeValueHandler(event,key)} value={Math.floor(value*10000)/10000}>
              </input>
            {key}
          </div>
        ))}
      <select onChange={addCurrencyHandler}>
      {Object.keys(currenciesAll).map(currency => (
          <option>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
