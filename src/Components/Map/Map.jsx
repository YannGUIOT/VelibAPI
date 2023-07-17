import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const Map = () => {
  useEffect(() => {
    const url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=100&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes';
    const body = document.getElementById('stations');

    // Map initialize
    const mymap = L.map('mapid').setView([48.855, 2.35], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    // Add marker & popup to the map
    const marker = (station) => {
      const marker = L.marker([station.coordonnees_geo[0], station.coordonnees_geo[1]]).addTo(mymap);
      marker.bindPopup(`${station.name} : ${station.ebike} ebike - ${station.mechanical} bike`);
    };

    // Make user position on the map
    navigator.geolocation.getCurrentPosition((position) => {
      const circle = L.circle([position.coords.latitude, position.coords.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100
      }).addTo(mymap);
      circle.bindPopup('Your position').openPopup();
    });

    // View by station
    const showVelibStation = (selector, name, numberClassicalVelibs, numberElectricVelibs, numberDocks) => {
      selector.innerHTML += `
        <div class='block-station'>
          <h2 class='station-title'>${name}</h2>
          <h4><u>Vélibs Disponibles</u></h4>
          <p>Classic : <strong>${numberClassicalVelibs}</strong> - Electric : <strong>${numberElectricVelibs}</strong></p>
          <h4><u>Docks Disponibles</u></h4>
          <p><strong>${numberDocks}</strong></p>
        </div>
      `;
    };

    // Fetch the API
    const stationsInfo = (response) => {
      body.innerHTML = "";
      for (let i = 0; i < 100; i++) {
        const station = response.records[i].fields;
        marker(station, i);
        showVelibStation(body, station.name, station.ebike, station.mechanical, station.numdocksavailable);
      }
    };

    const fetchAPI = () => {
      fetch(url)
        .then((response) => response.json())
        .then((response) => stationsInfo(response))
        .catch((error) => console.error(`ERROR: ${error}`));
    };

    // Fetch the API on component mount
    fetchAPI();

    // Fetch the API every 10 seconds
    const interval = setInterval(fetchAPI, 10000);

    // Clean up function
    return () => {
      clearInterval(interval);
      mymap.remove();
    };
  }, []);

  return (
    <div>
      <div id="mapid" style={{ height: '400px' }}></div>
      <h1>Liste des Stations</h1>
      <div id="stations"></div>
    </div>
  );
};
