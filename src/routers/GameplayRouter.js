import React from 'react';
import Home from '../pages/Home';
import { Route, Switch } from 'react-router-dom';

const GameplayRouter = () => {
  return (
    <>
      <Switch>
        <Route
          exact
          path='/play/actions'
          render={props => <Home hello='akcje' />}
        />
      </Switch>
    </>
  );
};

export default GameplayRouter;
