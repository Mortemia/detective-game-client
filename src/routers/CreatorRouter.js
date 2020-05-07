import React from 'react';
import Home from '../pages/Home';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/_creator/Dashboard';

const CreatorRouter = () => {
  return (
    <>
      <Switch>
        <Route path='/creator' component={Dashboard} />
      </Switch>
    </>
  );
};

export default CreatorRouter;
