import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Gameplay from '../layout/Gameplay';
import Creator from '../layout/Creator';
import Main from '../layout/Main';

const MainRouter = () => {
  return (
    <Switch>
      <Route path='/play' component={Gameplay} />
      <Route path='/creator' component={Creator} />
      <Route path='/' component={Main} />
    </Switch>
  );
};

export default MainRouter;
