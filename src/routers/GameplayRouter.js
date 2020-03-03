import React from 'react';
import Home from '../pages/Home';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/_gameplay/Dashboard';
import People from '../pages/_gameplay/People';

const GameplayRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path='/play' component={Dashboard} />
        <Route exact path='/play/people' component={People} />
      </Switch>
    </>
  );
};

export default GameplayRouter;
