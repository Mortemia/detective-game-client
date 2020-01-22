import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

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
  const items = props.items;

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
          Dzień 1
        </Typography>
        <Button variant='contained' color='primary' className={classes.button}>
          ZAKOŃCZ DZIEŃ
        </Button>
      </div>
      <div className={classes.innerContainer}>
        <Typography component='h2' gutterBottom>
          Posterunek
        </Typography>
        <Typography component='h2' gutterBottom>
          24.06.1997
        </Typography>
        <Typography component='h2' gutterBottom>
          Punkty Ruchu: 40
        </Typography>
      </div>
    </Paper>
  );
};

export default OverviewTile;
