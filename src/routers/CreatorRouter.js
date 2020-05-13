import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../pages/_creator/Dashboard';
import NewCaseDialog from '../pages/_creator/NewCaseDialog';
import Settings from '../pages/_creator/Settings';
import Actions from '../pages/_creator/Actions';
import Items from '../pages/_creator/Items';
import Locations from '../pages/_creator/Locations';
import People from '../pages/_creator/People';
import FinalTest from '../pages/_creator/FinalTest';
import Route from './AuthorizedRoute';

const CreatorRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path='/creator' component={Dashboard} />

        <Route exact path='/creator/newCase' component={NewCaseDialog} />

        <Route exact path='/creator/actions' component={Actions} />

        <Route exact path='/creator/locations' component={Locations} />

        <Route exact path='/creator/people' component={People} />

        <Route exact path='/creator/items' component={Items} />

        <Route exact path='/creator/settings' component={Settings} />

        <Route exact path='/creator/finalTest' component={FinalTest} />
      </Switch>
    </>
  );
};

export default CreatorRouter;
