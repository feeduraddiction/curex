import './App.css';
import React, { useState, useEffect } from 'react';

const URL_EVERYTHING = 'http://localhost:3002';
const URL_FILTERED = 'http://localhost:3002/filtered';

function App() {
  const [currenciesAll, setCurrenciesAll] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const fetchData = async (url, setStateFunc) =>{
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
      body: JSON.stringify({key: event.target.value}),
    })
      .then((request) => request.json()
        .then((json) => setCurrencies(json)));
  };

  const changeValueHandler = (key) => {
      console.log(key, 'changes')
  }

  return (
    <div className="App">
        {Object.entries(currencies).map(([key, value]) => (
          <div>
            <input readOnly="false" type="text" onChange={changeValueHandler(key)} value={value}>
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
