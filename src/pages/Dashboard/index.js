import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import GamesProgress from './GamesProgress';
import PaperList from '../../components/PaperList';
import Banner from './Banner';
import { gamesInProgress, casesInProgress } from '../../fakedata';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <>
      {' '}
      <div className={classes.paper}>
        <Banner />
      </div>
      <div className={classes.paper}>
        <PaperList listName='Sprawy w toku' items={gamesInProgress} />
      </div>
      <div className={classes.paper}>
        <PaperList listName='Własne sprawy' items={casesInProgress} />
      </div>
    </>
  );
};

export default Dashboard;
