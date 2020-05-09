import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import Question from './Question';
import { GameContext } from '../../../context/gameContext';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const FinalTest = () => {
  const classes = useStyles();
  const { game, dispatch } = React.useContext(GameContext);
  const [test, setTest] = React.useState([...game.test]);
  const [question, setQuestion] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const history = useHistory();

  const handleTestFinish = _ => {
    setOpen(false);
    dispatch({ type: 'FINISH_GAME', score });
    let path = '/play/result';
    history.push(path);
  };

  React.useEffect(() => {
    const question = test[0];
    question ? setQuestion(question) : handleTestFinish();
  }, [test]);

  const handleScore = answerScore => {
    setScore(score + answerScore);
    setTest(test.slice(1));
  };

  return (
    <>
      {open ? (
        <Question open={open} question={question} addScore={handleScore} />
      ) : (
        <Paper className={classes.paper}>
          <Typography component='h2' variant='h6' color='primary'>
            Test końcowy
          </Typography>
          <Typography
            variant='body2'
            color='textPrimary'
            component='p'
            className={classes.content}
          >
            W tym miejscu znajduje się przejście do ostatniej części gry - testu
            końcowego. Podejść do niego możesz tylko i wyłącznie RAZ!{' '}
          </Typography>
          <Typography
            variant='body2'
            color='textPrimary'
            component='p'
            className={classes.content}
          >
            Po kliknięciu przycisku DALEJ zostaną Ci zadane pytania
            jednokrotnego wyboru. Mogą dotyczyć różnych aspektów rozwiązywanej
            prawy, także przygotuj się dobrze. Dopiero kiedy jesteś pewien, co
            tak naprawdę się wydarzyło, spróbuj rozwiązać test końcowy.
          </Typography>
          <DialogActions>
            <Button
              color='primary'
              onClick={() => setOpen(true)}
              className={classes.button}
              size='large'
              variant='outlined'
            >
              Dalej
            </Button>
          </DialogActions>
        </Paper>
      )}
    </>
  );
};

export default FinalTest;
