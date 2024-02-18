import React, { useState, useEffect } from 'react';
import data from './data.json'
import './App.css'

const App = () => {
  const [stations, setStations] = useState([]); 
  const [randomStation, setRandomStation] = useState(null); 
  const [selectedStation, setSelectedStation] = useState(''); 
  const [selectedLines, setSelectedLines] = useState([]);
  const [attempts, setAttempts] = useState(1); 
  const lines = [1,2,3,4,5,6,7,8,9,10]

  const loadStations = () => {
    setStations(data);
  };

  const selectRandomStation = () => {
    const randomIndex = Math.floor(Math.random() * stations.length);
    setRandomStation(stations[randomIndex]);
  };

  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  const handleLinesChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedLines(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
  };

  useEffect(() => {
    loadStations();
    selectRandomStation();
  }, []); 


  return (
    <div className="App">
      <h1>Metroguessr</h1>
      {randomStation && (
        <div>
          <img src={randomStation.image || ""} />
        </div>
      )}
      <section className='intentos'>
        <form className='intento'>
          <div>
            <select value={selectedStation} onChange={handleStationChange} className='estacion'>
              <option value=""></option>
              {stations.map(station => (
                <option key={station.name} value={station.name}>{station.name}</option>
              ))}
            </select>
          </div>
          {/* <div>
            <select multiple value={selectedLines} onChange={handleLinesChange}>
              {lines.map(line => (
                <option key={line} value={line}>{line}</option>
              ))}
            </select>
          </div> */}
          <button onClick={handleSubmit} type="button" className='adivinar'>🚇 ADIVINAR</button>
        </form>
        <div className='intentosRestantes'>
          INTENTO {attempts} / 5
        </div>
        <div className='proximosIntentos'>
          {Array.from({ length: 5 - attempts }, (_, index) => (
            <div className='proximoIntento'></div>
          ))}
        </div>
      </section>
    </div>

  );
};

export default App;
