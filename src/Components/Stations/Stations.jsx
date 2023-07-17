import PropTypes from 'prop-types';

export const Stations = ({ stations }) => {
  const sortedStations = stations.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <h1>Les Stations Vélib</h1>
      <div className='line-station'>
        <div className='name-station italique'>Nom de la Station</div>
        <div className='velib-mechanical colored'>VÉLIB CLASSIQUE</div>
        <div className='velib-ebike colored'>VÉLIB ÉLECTRIQUE</div>
      </div>
      {sortedStations.map((station) => (
        <div className='line-station' key={station.name}>
          <div className={`name-station colored ${station.mechanical === 0 && station.ebike === 0 ? 'unavailable' : ''}`}>
            {station.name}
          </div>
          <div className={`velib-mechanical ${station.mechanical === 0 ? 'unavailable' : ''}`}>
            {station.mechanical}
          </div>
          <div className={`velib-ebike ${station.ebike === 0 ? 'unavailable' : ''}`}>
            {station.ebike}
          </div>
        </div>
      ))}
      <br/>
    </>
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