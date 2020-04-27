import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../pages/_gameplay/Dashboard';
import People from '../pages/_gameplay/People';
import Items from '../pages/_gameplay/Items';
import Actions from '../pages/_gameplay/Actions';
import Locations from '../pages/_gameplay/Locations';
import FinalTest from '../pages/_gameplay/FinalTest';

import { AppContext } from '../context/appContext';

const GameplayRouter = () => {
  const { appState } = React.useContext(AppContext);

  return (
    <>
      {!appState.user && <Redirect to='/login' />}
      <Switch>
        <Route exact path='/play' component={Dashboard} />

        <Route exact path='/play/items/:id' component={Items} />
        <Route path='/play/items' component={Items} />

        <Route exact path='/play/people/:id' component={People} />
        <Route path='/play/people' component={People} />

        <Route exact path='/play/actions/:id' component={Actions} />
        <Route path='/play/actions' component={Actions} />

        <Route path='/play/locations' component={Locations} />

        <Route path='/play/finalTest' component={FinalTest} />
      </Switch>
    </>
  );
};

export default GameplayRouter;
