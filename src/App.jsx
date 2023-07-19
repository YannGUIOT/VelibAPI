import { Stations } from './Components/Stations/Stations';
import { useEffect, useState } from 'react';
import { Map } from './Components/Map/Map';
import './App.css'


export const App = () => {

  window.scrollTo(0, 0);

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

    // Fetch the API on component mount
    fetchAPI();

    // Fetch the API every 60 seconds
    const interval = setInterval(fetchAPI, 60000);

    // Clean up function
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const changeCount = (n) => {
    if (((count+n) >= 50) && ((count+n) <= 800)) {setCount(count+n)}
    // if ((count+n) == 0 && (count > 99)) {setCount(count+(n/10))}
    // if ((count < 100) && (count > 10)) {setCount(count+(n/10))}
  }

  return (
    <>
      <h1>Vélib en Île-de-France</h1>
      <div className='count'>
        <p>Nombre de Stations affichées:</p>
        <p className='font-xl'><strong>{count}</strong></p>
        <button onClick={()=>{changeCount(-50)}}>-</button>
        <button onClick={()=>{changeCount(50)}}>+</button>
      </div>
      <Map stations={stations} />
      <Stations stations={stations} />
      <p className='footer'>API EXAMPLE BY : <a href='https://yannguiot.github.io/' target="_blank">YANN GUIOT - FULLSTACK WEB DEVELOPER</a></p>
    </>
  );
};