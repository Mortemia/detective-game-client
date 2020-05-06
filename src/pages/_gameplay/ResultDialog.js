import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Question from '../_gameplay/FinalTest/Question';
import { GameContext } from '../../context/gameContext';

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

const ResultDialog = () => {
  const classes = useStyles();
  const { game, dispatch } = React.useContext(GameContext);
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const descriptionElementRef = React.useRef(null);

  const handleClick = _ => {
    let path = '/dashboard';
    history.push(path);
  };

  return (
    <Dialog
      open={open}
      scroll='paper'
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      disableBackdropClick
    >
      <DialogTitle id='scroll-dialog-title'>Zakończenie</DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id='scroll-dialog-description'
          ref={descriptionElementRef}
          tabIndex={-1}
          color='textPrimary'
        >
          Twój wynik to: {game.score}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleClick}>
          Przejdź do dashboardu gracza
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultDialog;
