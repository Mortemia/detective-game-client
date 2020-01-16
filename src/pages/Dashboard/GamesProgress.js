import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { gamesInProgress } from '../../fakedata';

const useStyles = makeStyles(theme => ({
  root: {},
}));

const GamesProgress = () => {
  const classes = useStyles();

  return <div className={classes.root}></div>;
};

export default GamesProgress;
