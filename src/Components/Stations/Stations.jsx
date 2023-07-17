import PropTypes from 'prop-types';

export const Stations = ({ stations }) => {
  return (
    <div id="stations">
      {stations.map((station) => (
        <div className="block-station" key={station.name}>
          <h2 className="station-title">{station.name}</h2>
          <h4>
            <u>Vélibs Disponibles</u>
          </h4>
          <p>
            Classic : <strong>{station.mechanical}</strong> - Electric : <strong>{station.ebike}</strong>
          </p>
          <h4>
            <u>Docks Disponibles</u>
          </h4>
          <p>
            <strong>{station.numdocksavailable}</strong>
          </p>
        </div>
      ))}
    </div>
  );
};


Stations.propTypes = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      mechanical: PropTypes.number.isRequired,
      ebike: PropTypes.number.isRequired,
      numdocksavailable: PropTypes.number.isRequired,
    })
  ).isRequired,
};