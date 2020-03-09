import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CommuteIcon from '@material-ui/icons/Commute';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import PaperList from '../../../components/PaperList';
import OverviewTile from './OverviewTile';
import { GameContext } from '../../../context/gameContext';
import { fastTravelLocations } from '../../../utils/gameUtils';
import { AppContext } from '../../../context/appContext';

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
  const { appDispatch } = React.useContext(AppContext);
  const history = useHistory();

  const handleTravel = destination => {
    game.movement_points - destination.cost >= 0
      ? dispatch({ type: 'TRAVEL', destination })
      : appDispatch({
          type: 'OPEN_SNACKBAR',
          snackbar: {
            visible: true,
            severity: 'error',
            message: 'Niewystarczająca liczba punktów ruchu',
          },
        });
  };

  const handleExamine = item => {
    dispatch({ type: 'EXAMINE', item });
    const snackbar = {
      visible: true,
      severity: 'success',
      message: 'Przedmiot został zbadany',
    };
    appDispatch({
      type: 'OPEN_SNACKBAR',
      snackbar,
    });
    handleClick('items')(item);
  };

  const handleClick = type => component => {
    let path = `play/${type}/${component.id}`;
    history.push(path);
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
          action={handleTravel}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <PaperList
          listName='Przedmioty'
          items={game.items}
          icon={ZoomInIcon}
          primary='name'
          navigate={handleClick('items')}
          action={handleExamine}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <PaperList
          listName='Ostatnio wyświetleni'
          items={game.people}
          primary='fullname'
          navigate={handleClick('people')}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
