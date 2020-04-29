import React from 'react';
import Home from '../pages/Home';
import { Route, Switch, Redirect } from 'react-router-dom';
import HowToPlay from '../pages/HowToPlay';
import Dashboard from '../pages/Dashboard';
import LoginForm from '../pages/Login';
import { AppContext } from '../context/appContext';

const HomeRouter = () => {
  const { appState } = React.useContext(AppContext);

  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/howtoplay' component={HowToPlay} />
        <Route exact path='/login' component={LoginForm} />
        {!appState.user ? (
          <Redirect to='/login' />
        ) : (
          <Route exact path='/dashboard' component={Dashboard} />
        )}
      </Switch>
    </>
  );
};

export default HomeRouter;
