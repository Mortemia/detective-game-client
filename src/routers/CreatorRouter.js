import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/_creator/Dashboard';
import NewCaseDialog from '../pages/_creator/NewCaseDialog';

const CreatorRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path='/creator' component={Dashboard} />

        <Route exact path='/creator/newCase' component={NewCaseDialog} />
      </Switch>
    </>
  );
};

export default CreatorRouter;
