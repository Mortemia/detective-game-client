import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { GameContext } from '../../../context/gameContext';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: '100%',
  },
  container: {
    display: 'flex',
  },
  typography: {
    flexGrow: 1,
  },
  innerContainer: {
    padding: theme.spacing(2),
  },
}));

const OverviewTile = props => {
  const classes = useStyles();
  const { dispatch, game } = React.useContext(GameContext);

  const handleNextDayButton = _ => {
    if (game.day < game.max_days) {
      dispatch({
        type: 'NEXT_DAY',
        new_day: game.day + 1,
        movement_points: game.mp_per_day,
      });
      game.movement_points < 0 &&
        dispatch({
          type: 'ADD_STRESS_POINTS',
          stress_points: Math.abs(game.movement_points),
        });
    }
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.container}>
        <Typography
          component='h2'
          variant='h6'
          color='primary'
          gutterBottom
          className={classes.typography}
        >
          Dzień {game.day} / {game.max_days}
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={handleNextDayButton}
          className={classes.button}
        >
          ZAKOŃCZ DZIEŃ
        </Button>
      </div>
      <div className={classes.innerContainer}>
        <Typography component='h2' gutterBottom>
          Obecna lokalizacja: {game.location}
        </Typography>
        <Typography component='h2' gutterBottom>
          Punkty Ruchu: {game.movement_points}
        </Typography>
        <Typography component='h2' gutterBottom>
          Punkty Stresu: {game.stress_points}
        </Typography>
        {game.movement_points <= 0 && (
          <Typography component='h2' color='textSecondary' gutterBottom>
            Zakończ dzień albo podejdź do testu końcowego!
          </Typography>
        )}
      </div>
    </Paper>
  );
};

export default OverviewTile;
