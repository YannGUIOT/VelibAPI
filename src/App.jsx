import { Stations } from './Components/Stations/Stations';
import { useEffect, useState } from 'react';
import { Map } from './Components/Map/Map';
import './App.css'


export const App = () => {

  window.scrollTo(0, 0);

  const [stations, setStations] = useState([]);

  useEffect(() => {
    const url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=500&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes';

    const fetchAPI = () => {
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
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
  }, []);

  return (
    <>
      <h1>Disponibilité des Vélib en Île-de-France</h1>
      <Map stations={stations} />
      <Stations stations={stations} />
      <p className='footer'>API EXAMPLE BY : <a href='https://yannguiot.github.io/' target="_blank">YANN GUIOT - FULLSTACK WEB DEVELOPER</a></p>
    </>
  );
};