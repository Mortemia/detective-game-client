import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SimpleBar from '../layout/SimpleBar';
import MainRouter from '../routers/MainRouter';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    //display: 'flex'
  },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <>
      <SimpleBar />
      <div className={classes.root}>
        <MainRouter />
      </div>
    </>
  );
};

export default Main;
