import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CommuteIcon from '@material-ui/icons/Commute';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import PaperList from '../../../components/PaperList';
import OverviewTile from './OverviewTile';
import { GameContext } from '../../../context/gameContext';
import {
  getRevealedLocations,
  getPossibleActions,
  getRevealedPeople,
  getRevealedItems,
  getLocationByName,
  getPathToLocation,
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
    examineItem(dispatchers, game, item);
    handleClick('items')(item);
  };

  const handleActionExcecution = action => {
    executeAction(dispatchers, game, action) && handleClick('actions')(action);
  };

  const checkTravelPossibility = location => {
    const path = getPathToLocation(game, game.location, location.name);
    return !!path;
  };

  const handleClick = type => component => {
    if (type === 'locations')
      component = getLocationByName(game, component.name);
    let path = `/play/${type}/${component.id}`;
    history.push(path);
  };

  return (
    <>
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
            navigate={handleActionExcecution}
            action={handleActionExcecution}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <PaperList
            listName='Miejsca'
            items={getRevealedLocations(game)}
            primary='name'
            secondary='costMP'
            icon={CommuteIcon}
            action={handleTravel}
            navigate={handleClick('locations')}
            tooltip='Podróżuj'
            actionPossibility={checkTravelPossibility}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <PaperList
            listName='Przedmioty'
            items={getRevealedItems(game)}
            icon={ZoomInIcon}
            primary='name'
            navigate={handleClick('items')}
            action={handleExamine}
            tooltip='Zbadaj przedmiot kosztem PR'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <PaperList
            listName='Osoby'
            items={getRevealedPeople(game)}
            primary='fullname'
            navigate={handleClick('people')}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
