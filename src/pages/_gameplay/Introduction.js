import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { GameContext } from '../../context/gameContext';
import { AppContext } from '../../context/appContext';
import Button from '@material-ui/core/Button';
import ComponentCard from '../../components/ComponentCard';
import { getActionById } from '../../utils/gameUtils';
import { executeAction } from '../../context/actions';
import GameAPI from '../../api/GameAPI';

const gameAPI = new GameAPI();

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(4),
  },
}));

const Introduction = _ => {
  const classes = useStyles();
  const { game, dispatch } = React.useContext(GameContext);
  const { appDispatch } = React.useContext(AppContext);
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  React.useEffect(() => {
    executeAction(dispatchers, game, getActionById(game, game.frst_action_id));
    appDispatch({ type: 'CLOSE_SNACKBAR', message: '' });
  }, [game.frst_action_id]);

  const handleClick = _ => {
    gameAPI.saveDetectiveCase(game);
  };

  return (
    <ComponentCard
      component={getActionById(game, game.frst_action_id)}
      title='Wstęp'
    >
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        onClick={handleClick}
        component={Link}
        to='/play/'
      >
        Rozwiąż zagadkę!
      </Button>
    </ComponentCard>
  );
};

export default Introduction;
