import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/_creator/Dashboard';
import NewCaseDialog from '../pages/_creator/NewCaseDialog';
import Settings from '../pages/_creator/Settings';
import Locations from '../pages/_creator/Locations';

const CreatorRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path='/creator' component={Dashboard} />

        <Route exact path='/creator/newCase' component={NewCaseDialog} />

        <Route exact path='/creator/locations' component={Locations} />

        <Route exact path='/creator/settings' component={Settings} />
      </Switch>
    </>
  );
};

export default CreatorRouter;
