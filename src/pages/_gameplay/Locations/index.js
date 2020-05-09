import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CommuteIcon from '@material-ui/icons/Commute';
import { GameContext } from '../../../context/gameContext';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';
import LocationGraph from './Graph';
import LocationCard from './LocationCard';
import {
  getRevealedLocationsTravelCost,
  getLocationByName,
} from '../../../utils/gameUtils';
import { travel } from '../../../context/actions';

const useStyles = makeStyles(theme => ({
  grid: {
    maxHeight: '300px',
  },
  locationList: {
    maxHeight: '300px',
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

  const [initGraph, setInitGraph] = React.useState(1);
  const [hoveredLocation, setHoveredLocation] = React.useState(null);
  const [location, setLocation] = React.useState(
    game.locations.find(x => x.id === parseInt(id) && x.revealed) || null
  );

  setTimeout(() => setInitGraph(0), 1000);

  const handleNavigate = newLocation => {
    const location = getLocationByName(game, newLocation.name);
    let path = `/play/locations/${location.id}`;
    history.push(path);
    setLocation(location);
  };

  const checkTravelPossibility = location => game.location !== location.name;

  const handleTravel = destination => {
    travel(dispatchers, game, destination);
  };

  return (
    <>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} sm={4} md={4}>
          <PaperList
            listName='Miejsca'
            primary='name'
            items={getRevealedLocationsTravelCost(game)}
            secondary='costMP'
            navigate={handleNavigate}
            hover={setHoveredLocation}
            className={classes.locationList}
            actionPossibility={checkTravelPossibility}
            action={handleTravel}
            icon={CommuteIcon}
            tooltip='Podróżuj'
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          {location && <LocationCard location={location} />}
        </Grid>
      </Grid>
      <LocationGraph
        hoveredLocation={hoveredLocation}
        chosenLocation={location && location.name}
        className={classes.graph}
        init={initGraph}
      />
    </>
  );
};

export default Locations;
