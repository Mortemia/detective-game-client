import React from 'react';
import Home from '../pages/Home';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/_gameplay/Dashboard';

const GameplayRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path='/play' component={Dashboard} />
      </Switch>
    </>
  );
};

export default GameplayRouter;
