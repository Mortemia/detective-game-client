import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/_gameplay/Dashboard';
import People from '../pages/_gameplay/People';
import Items from '../pages/_gameplay/Items';
import Actions from '../pages/_gameplay/Actions';
const GameplayRouter = () => {
  return (
    <Switch>
      <Route exact path='/play' component={Dashboard} />

      <Route exact path='/play/items/:id' component={Items} />
      <Route path='/play/items' component={Items} />

      <Route exact path='/play/people/:id' component={People} />
      <Route path='/play/people' component={People} />

      <Route exact path='/play/actions/:id' component={Actions} />
      <Route path='/play/actions' component={Actions} />
    </Switch>
  );
};

export default GameplayRouter;
