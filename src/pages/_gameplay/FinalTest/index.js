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

let score = 0;

const FinalTest = () => {
  const classes = useStyles();
  const { game, dispatch } = React.useContext(GameContext);
  const [question, setQuestion] = React.useState(null);
  const [test, setTest] = React.useState([...game.test]);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleClick = _ => {
    const firstQuestion = test.shift();
    setQuestion(firstQuestion);
    setOpen(true);
  };

  const handleTestFinish = _ => {
    setOpen(false);
    console.log('wynik kampanii: ' + score);

    dispatch({ type: 'FINISH_GAME', score });
    let path = '/play/result';
    history.push(path);
  };

  const handleNextQuestion = answerScore => {
    score += answerScore;
    const question = test.shift();
    question ? setQuestion(question) : handleTestFinish();
  };

  return (
    <div className={classes.root}>
      {open ? (
        <Question
          open={open}
          question={question}
          nextQuestion={handleNextQuestion}
        />
      ) : (
        <Paper>
          <div className={classes.content}>Test końcowy</div>
          <Button color='primary' onClick={handleClick}>
            Dalej
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default FinalTest;
