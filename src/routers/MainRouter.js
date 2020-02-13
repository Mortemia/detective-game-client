import React from 'react';
import Home from '../pages/Home';
import { Route, Switch } from 'react-router-dom';

import HowToPlay from '../pages/HowToPlay';
import Dashboard from '../pages/Dashboard';
import LogIn from "../pages/Login";

const HomeRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/howtoplay' component={HowToPlay} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/login' component={LogIn} />
      </Switch>
    </>
  );
};

export default HomeRouter;
