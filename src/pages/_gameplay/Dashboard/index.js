import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CommuteIcon from '@material-ui/icons/Commute';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import PaperList from '../../../components/PaperList';
import OverviewTile from './OverviewTile';
import { places, items, people, actions } from '../../../fakedata';
import { GameContext } from '../../../context/gameContext';
import { getLocationById } from '../../../utils/gameUtils';
import { fastTravelLocations } from '../../../utils/gameUtils';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
    //display: 'flex'
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { game, dispatch } = React.useContext(GameContext);

  const handleTravel = destination => {
    dispatch({ type: 'TRAVEL', destination });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={4}>
        <OverviewTile />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <PaperList
          listName='Możliwe akcje'
          items={game.actions}
          primary='name'
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <PaperList
          listName='Miejsca'
          items={fastTravelLocations(game)}
          primary='name'
          secondary='costMP'
          icon={CommuteIcon}
          onClick={handleTravel}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <PaperList
          listName='Przedmioty'
          items={game.items}
          icon={ZoomInIcon}
          primary='name'
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <PaperList
          listName='Ostatnio wyświetleni'
          items={game.people}
          primary='fullname'
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
