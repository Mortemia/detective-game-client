import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { GameContext } from '../../../context/gameContext';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';
import LocationGraph from './Graph';

const Locations = _ => {
  const { game, dispatch } = React.useContext(GameContext);
  const { appDispatch } = React.useContext(AppContext);
  const history = useHistory();
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  const [hoveredLocation, setHoveredLocation] = React.useState(null);

  const { id } = useParams();
  let Location = game.locations.find(x => x.id === parseInt(id)) || null;

  const handleNavigate = newLocation => {
    Location = newLocation;
    let path = `/play/locations/${newLocation.id}`;
    history.push(path);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={4}>
        <PaperList
          listName='Lokacje'
          primary='name'
          items={game.locations}
          navigate={handleNavigate}
          hover={setHoveredLocation}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
        <LocationGraph hoveredLocation={hoveredLocation} />
      </Grid>
    </Grid>
  );
};

export default Locations;
