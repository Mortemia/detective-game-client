import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';
import CommuteIcon from '@material-ui/icons/Commute';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import PaperList from '../../../components/PaperList';
import { places, items, people, actions } from '../../../fakedata';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
    //display: 'flex'
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4}>
          <PaperList
            listName='Tymczasowy komponent'
            items={items}
            icon={ZoomInIcon}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <PaperList listName='Możliwe akcje' items={actions} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <PaperList
            listName='Miejsca'
            items={places}
            icon={CommuteIcon}
            dashboard={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <PaperList
            listName='Przedmioty'
            items={items}
            icon={ZoomInIcon}
            dashboard={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <PaperList
            listName='Ostatnio wyświetleni'
            items={people}
            dashboard={true}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
