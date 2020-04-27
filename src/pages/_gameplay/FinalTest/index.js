import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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

const FinalTest = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <div className={classes.content}>Test końcowy</div>
      </Paper>
    </div>
  );
};

export default FinalTest;
