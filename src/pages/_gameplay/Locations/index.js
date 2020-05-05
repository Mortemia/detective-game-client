import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { GameContext } from '../../../context/gameContext';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';
import LocationGraph from './Graph';
import LocationCard from './LocationCard';
import { getRevealedLocations } from '../../../utils/gameUtils';

const useStyles = makeStyles(theme => ({
  grid: {
    maxHeight: '250px',
  },
  locationList: {
    maxHeight: '250px',
  },
  graph: {
    paddingTop: '40px',
  },
}));

const Locations = _ => {
  const classes = useStyles();

  const { game, dispatch } = React.useContext(GameContext);
  const { appDispatch } = React.useContext(AppContext);
  const history = useHistory();
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  const { id } = useParams();

  const [hoveredLocation, setHoveredLocation] = React.useState(null);
  const [location, setLocation] = React.useState(
    game.locations.find(x => x.id === parseInt(id) && x.revealed) || null
  );

  const handleNavigate = newLocation => {
    let path = `/play/locations/${newLocation.id}`;
    history.push(path);
    setLocation(newLocation);
  };

  return (
    <>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} sm={4} md={4}>
          <PaperList
            listName='Lokacje'
            primary='name'
            items={getRevealedLocations(game)}
            navigate={handleNavigate}
            hover={setHoveredLocation}
            className={classes.locationList}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <LocationCard location={location} />
        </Grid>
      </Grid>
      <LocationGraph
        hoveredLocation={hoveredLocation}
        className={classes.graph}
      />
    </>
  );
};

export default Locations;
