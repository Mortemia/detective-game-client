import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
      <div className={classes.paper}>
        <Banner />
      </div>
      <div className={classes.paper}>
        <PaperList
          listName='Sprawy w toku'
          primary='primary'
          items={gamesInProgress}
        />
      </div>
      <div className={classes.paper}>
        <PaperList
          listName='Własne sprawy'
          primary='primary'
          items={casesInProgress}
        />
      </div>
    </>
  );
};

export default Dashboard;
