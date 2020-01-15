import React from 'react';
import Home from '../pages/Home';
import { Route, Switch } from 'react-router-dom';

import HowToPlay from '../pages/HowToPlay';
import Dashboard from '../pages/Dashboard';

const HomeRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/howtoplay' component={HowToPlay} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </>
  );
};

export default HomeRouter;
