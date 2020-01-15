import React from 'react';
import Home from '../pages/Home';
import { Route, Switch } from 'react-router-dom';

const CreatorRouter = () => {
  return (
    <>
      <Switch>
        <Route path='/creator' component={Home} />
      </Switch>
    </>
  );
};

export default CreatorRouter;
