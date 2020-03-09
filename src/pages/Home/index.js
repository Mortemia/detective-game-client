import React from 'react';
import Banner from './Banner';
import InfoGrid from './InfoGrid';
import Divider from '@material-ui/core/Divider';

const Home = () => {
  return (
    <>
      <Banner />
      <Divider />
      <InfoGrid />
    </>
  );
};

export default Home;
