import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Dashboard from '../pages/_gameplay/Dashboard';
import People from '../pages/_gameplay/People';
import Items from '../pages/_gameplay/Items';
import Actions from '../pages/_gameplay/Actions';
import Locations from '../pages/_gameplay/Locations';
import FinalTest from '../pages/_gameplay/FinalTest';
import ResultDialog from '../pages/_gameplay/ResultDialog';
import IntroductionDialog from '../pages/_gameplay/IntroductionDialog';
import Route from './AuthorizedRoute';

const GameplayRouter = () => {
  return (
    <Switch>
      <Route exact path='/play' component={Dashboard} />

      <Route exact path='/play/result' component={ResultDialog} />
      <Route exact path='/play/intro' component={IntroductionDialog} />

      <Route exact path='/play/items/:id' component={Items} />
      <Route path='/play/items' component={Items} />

      <Route exact path='/play/people/:id' component={People} />
      <Route path='/play/people' component={People} />

      <Route exact path='/play/actions/:id' component={Actions} />
      <Route path='/play/actions' component={Actions} />

      <Route path='/play/locations/:id' component={Locations} />
      <Route path='/play/locations' component={Locations} />

      <Route path='/play/finalTest' component={FinalTest} />
      <Route exact path='/play/:parameter' component={Dashboard} />
    </Switch>
  );
};

export default GameplayRouter;
