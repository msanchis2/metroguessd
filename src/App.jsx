import React, { useState, useEffect } from 'react';
import data from './data.json'
import './App.css'

const App = () => {
  const [stations, setStations] = useState([]); 
  const [randomStation, setRandomStation] = useState(null); 
  const [selectedStation, setSelectedStation] = useState(''); 
  const [selectedLines, setSelectedLines] = useState([]);
  const [attempts, setAttempts] = useState(1); 
  const [addLanes, setAddLanes] = useState(false); 
  const [attemptList, setAttemptList] = useState([]);
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
    
  };

  const handleShowModal = () => {
    console.log(addLanes)
    setAddLanes(!addLanes)
  }

  const handleSubmit = () => {
    setAttempts(attempts + 1)
    setAttemptList([...attemptList, {station: selectedStation}])
  };

  useEffect(() => {
    loadStations();
  }, []); 

  useEffect(() => {
    selectRandomStation();
  }, [stations]); 


  return (
    <div className="App">
      <h1>Metroguessr</h1>
      {addLanes && 
        <div className='modal'>
          <div className='seleccionLineas'>
            {lines.map(el => {
              return (<img src={`../public/images/lanes/${el}.png`}/>)
            })}
          </div>
          <button onClick={() => setAddLanes(false)}></button>
        </div>
      }
      {randomStation && (
        <div className='imagenEstacion'>
          <img src={randomStation.image || "https://upload.wikimedia.org/wikipedia/commons/4/4a/Valencia_metro_2015_Empalma.jpg"} />
        </div>
      )}
      <section className='intentos'>
        {attemptList.map(el => {
          return(
            <div className='intento'>
              <select value={el.station} disabled className='estacion'>
                <option value={el.station}>{el.station}</option>
              </select>
            </div>
          )
        })}
        {attempts <= 5 && <form className='intento'>
          <select value={selectedStation} onChange={handleStationChange} className='estacion'>
            <option value=""></option>
            {stations.map(station => (
              <option key={station.name} value={station.name}>{station.name}</option>
            ))}
          </select>
          <div className='listaLineas'>
            {selectedLines.map(el => { 
              return (
                <img src={`../public/images/lanes/${el}.png`}/>
              )
            })}
          </div>
          <button onClick={handleShowModal} type="button" className='lineas'>➕</button>
          <button onClick={handleSubmit} type="button" className='adivinar'>🚇 ADIVINAR</button>
        </form> }
        <div className='intentosRestantes'>
          {attempts <= 5 ? `INTENTO ${attempts} / 5` : `La estación era ${randomStation.name}`}
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
