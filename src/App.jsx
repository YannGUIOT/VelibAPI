import { Stations } from './Components/Stations/Stations';
import { useEffect, useState } from 'react';
import { Map } from './Components/Map/Map';
import './App.css'


export const App = () => {

  const [stations, setStations] = useState([]);
  const [count, setCount] = useState(200);

  useEffect(() => {
    const url = `https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=${count}&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes`;

    const fetchAPI = () => {
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          const stationsData = response.records.slice(0, 1465).map((record) => record.fields);
          setStations(stationsData);
        })
        .catch((error) => console.error(`ERROR: ${error}`));
    };

    fetchAPI();

    const interval = setInterval(fetchAPI, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const changeCount = (n) => {
    if (((count+n) >= 50) && ((count+n) <= 800)) {setCount(count+n)}
  }

  return (
    <>
      <h1>Vélib en Île-de-France</h1>
      <div className='count'>
        <p>Nombre de Stations affichées:</p>
        <button onClick={()=>{changeCount(-50)}} className={count === 50 ? 'stop-count' : ''}>-</button>
        <strong className='font-xl'> {count} </strong>
        <button onClick={()=>{changeCount(50)}} className={count === 800 ? 'stop-count' : ''}>+</button>
      </div>
      <Map stations={stations} />
      <Stations stations={stations} />
      <p className='footer'>API EXAMPLE BY : <a href='https://yannguiot.github.io/' target="_blank">YANN GUIOT - FULLSTACK WEB DEVELOPER</a></p>
    </>
  );
};