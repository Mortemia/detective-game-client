import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Question from './Question';
import { GameContext } from '../../../context/gameContext';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '35rem',
    justifyContent: 'center',
    margin: 'auto',
    padding: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(1),
  },
}));

const Result = () => {
  const classes = useStyles();
  const { game, dispatch } = React.useContext(GameContext);
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Paper>
        Twój wynik:
        {game.score}
      </Paper>
    </div>
  );
};

export default Result;
