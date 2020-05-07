import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const Banner = ({ name }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.root}>
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            Cześć, {name || 'nieznajomy'}!
          </Typography>
        </div>
        <Button
          variant='contained'
          color='primary'
          component={Link}
          to='/dashboard/newgame'
          className={classes.button}
        >
          Nowa gra
        </Button>
        <Button
          variant='contained'
          color='primary'
          component={Link}
          to='/creator'
          className={classes.button}
        >
          Stwórz własną sprawę
        </Button>
      </Paper>
    </div>
  );
};

export default Banner;
