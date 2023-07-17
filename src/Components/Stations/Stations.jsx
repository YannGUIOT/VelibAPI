import PropTypes from 'prop-types';

export const Stations = ({ stations }) => {
  const sortedStations = stations.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <h1>Les Stations Vélib</h1>
      <div className='line-station bold'>
        <div className='name-station'>STATION</div>
        <div className='velib-mechanical'>VÉLIB<br />CLASSIQUE</div>
        <div className='velib-ebike'>VÉLIB<br />ÉLECTRIQUE</div>
      </div>
      {sortedStations.map((station) => (
        <div className='line-station' key={station.name}>
          <div className='name-station bold'>{station.name}</div>
          <div className='velib-mechanical'>{station.mechanical}</div>
          <div className='velib-ebike'>{station.ebike}</div>
        </div>
      ))}
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