import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { GameContext } from '../../../context/gameContext';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';
import { executeAction } from '../../../context/actions';
import { getPossibleActions } from '../../../utils/gameUtils';

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
      history.push(`/play/action/${action.id}`);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6}>
        <PaperList
          listName='Akcje'
          primary='name'
          secondary='location'
          items={getPossibleActions(game)}
          navigate={handleNavigate}
          action={handleAction}
        />
      </Grid>
    </Grid>
  );
};

export default Actions;
