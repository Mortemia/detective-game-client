import React from 'react';
import Cookie from 'js-cookie';
import { Route, Switch, Redirect } from 'react-router-dom';
import Gameplay from '../layout/Gameplay';
import Creator from '../layout/Creator';
import Main from '../layout/Main';

const AuthorizedRoute = props => {
  const token = Cookie.get('token');

  if (!token) {
    return <Redirect to='/login' />;
  }

  return <Route {...props} />;
};

export default AuthorizedRoute;
