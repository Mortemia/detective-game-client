import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { GameContext } from '../../../context/gameContext';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';
import { executeAction } from '../../../context/actions';
import { getPossibleActions, getDoneActions } from '../../../utils/gameUtils';
import Action from './Action';

const Actions = _ => {
  const { game, dispatch } = React.useContext(GameContext);
  const { appDispatch } = React.useContext(AppContext);
  const history = useHistory();
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  const { id } = useParams();
  let action = game.actions.find(x => x.id === parseInt(id)) || null;

  const handleNavigate = newAction => {
    action = newAction;
    let path = `/play/actions/${newAction.id}`;
    history.push(path);
  };

  const handleAction = action => {
    executeAction(dispatchers, game, action) &&
      history.push(`/play/actions/${action.id}`);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid
          item
          container
          direction='column'
          spacing={3}
          xs={12}
          sm={4}
          md={4}
        >
          <Grid item>
            <PaperList
              listName='Dostępne akcje'
              primary='name'
              secondary='location'
              items={getPossibleActions(game)}
              action={handleAction}
            />
          </Grid>
          <Grid item>
            <PaperList
              listName='Wykonane akcje'
              primary='name'
              secondary='location'
              items={getDoneActions(game)}
              navigate={handleNavigate}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Action action={action} />
        </Grid>
      </Grid>
    </>
  );
};

export default Actions;
