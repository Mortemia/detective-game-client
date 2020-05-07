import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { GameContext } from '../../../context/gameContext';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';
import ActionCard from './ActionCard';

const Actions = _ => {
  const { game, dispatch } = React.useContext(GameContext);
  const { appDispatch } = React.useContext(AppContext);
  const history = useHistory();
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  const { id } = useParams();
  let action = game.actions.find(x => x.id === parseInt(id) && x.done) || null;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item>
          <PaperList
            listName='Stworzone akcje'
            primary='name'
            secondary='location'
          />
        </Grid>

        <Grid item xs={12} sm={8} md={8}>
          {/* <ActionCard action={action} /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Actions;
