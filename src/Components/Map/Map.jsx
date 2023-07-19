import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export const Map = ({ stations }) => {
  
  const mapRef = useRef(null);

  useEffect(() => {
    const mymap = L.map(mapRef.current).setView([48.855, 2.35], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);

    const addMarkerToMap = (station) => {
      const marker = L.marker([station.coordonnees_geo[0], station.coordonnees_geo[1]]).addTo(mymap);
      marker.bindPopup(`${station.name} : ${station.ebike} ebike - ${station.mechanical} bike`);
    };

    navigator.geolocation.getCurrentPosition((position) => {
      const circle = L.circle([position.coords.latitude, position.coords.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100,
      }).addTo(mymap);
      circle.bindPopup('Your position').openPopup();
    });

    stations.forEach((station) => {
      addMarkerToMap(station);
    });

    return () => {
      mymap.remove();
    };
  }, [stations]);

  return <div id="mapid" ref={mapRef}></div>;
};


Map.propTypes = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      ebike: PropTypes.number.isRequired,
      mechanical: PropTypes.number.isRequired,
      coordonnees_geo: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    })
  ).isRequired,
};