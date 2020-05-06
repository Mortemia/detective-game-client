import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { GameContext } from '../../../context/gameContext';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    width: '40rem',
  },
}));

const Question = ({ question, nextQuestion, open }) => {
  const classes = useStyles();
  const { game, dispatch } = React.useContext(GameContext);
  const descriptionElementRef = React.useRef(null);
  const [value, setValue] = React.useState('');

  const handleRadioChange = event => {
    setValue(event.target.value);
  };

  const handleClick = _ => {
    const correct = question.answers.find(answer => answer.content === value)
      .correct;
    setValue('');
    nextQuestion(correct ? 10 : 0);
  };
  return (
    <Dialog
      open={open}
      scroll='paper'
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      disableBackdropClick
      className={classes.root}
    >
      <DialogTitle id='scroll-dialog-title'>Pytanie </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id='scroll-dialog-description'
          ref={descriptionElementRef}
          tabIndex={-1}
          color='textPrimary'
        >
          {question.content}
        </DialogContentText>
        <RadioGroup
          aria-label='quiz'
          name='quiz'
          value={value}
          onChange={handleRadioChange}
        >
          {question.answers.map((answer, index) => (
            <FormControlLabel
              value={answer.content}
              control={<Radio />}
              label={answer.content}
              key={index}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleClick} disabled={!value}>
          Dalej
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Question;
