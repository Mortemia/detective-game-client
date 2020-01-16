import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  paperDashboard: {
    height: theme.spacing(23),
  },
}));

const OverviewTile = props => {
  const classes = useStyles();
  const items = props.items;

  return (
    <Paper
      className={clsx(classes.paper, props.dashboard && classes.paperDashboard)}
    >
      <div className={classes.root}>
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          Dzień 1
        </Typography>
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
