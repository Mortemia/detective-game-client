import React from 'react';
import Banner from './Banner';
import InfoGrid from './InfoGrid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    //marginLeft: theme.spacing(4)
  },
}));

const Home = () => {
  // const classes = useStyles();

  return (
    <>
      <Banner />
      <Divider />
      <InfoGrid />
    </>
  );
};

export default Home;
