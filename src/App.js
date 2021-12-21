import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [currency, setCurrency] = useState([]);
  const fetchData = async () =>{
    try {
      const response = await fetch('http://localhost:3002');
      const json = await response.json()
      setCurrency(json);
    } catch (error) {
      console.log('error', error)
    }
  }
  console.log(currency)
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div className="App">
      <ul>
        {Array.from(currency).map(currency => (
          <li>
            {currency.Cur_Abbreviation}
            {currency.Cur_OfficialRate}
          </li>
        ))}
      </ul>
      <select>
      {Array.from(currency).map(currency => (
          <option>
            {currency.Cur_Abbreviation}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
