import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CommuteIcon from '@material-ui/icons/Commute';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import PaperList from '../../../components/PaperList';
import OverviewTile from './OverviewTile';
import { GameContext } from '../../../context/gameContext';
import {
  fastTravelLocations,
  getPossibleActions,
  getPossiblePeople,
} from '../../../utils/gameUtils';
import { AppContext } from '../../../context/appContext';
import { examineItem, travel, executeAction } from '../../../context/actions';

const Dashboard = () => {
  const { game, dispatch } = React.useContext(GameContext);
  const { appDispatch } = React.useContext(AppContext);
  const history = useHistory();
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  const handleTravel = destination => {
    travel(dispatchers, game, destination);
  };

  const handleExamine = item => {
    examineItem(dispatchers, item);
    handleClick('items')(item);
  };

  const handleActionExcecution = action => {
    executeAction(dispatchers, game, action) && handleClick('actions')(action);
  };

  const handleClick = type => component => {
    let path = `/play/${type}/${component.id}`;
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
          items={getPossibleActions(game)}
          primary='name'
          secondary='location'
          action={handleActionExcecution}
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
          items={getPossiblePeople(game)}
          primary='fullname'
          navigate={handleClick('people')}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
