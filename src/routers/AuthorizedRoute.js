import React from 'react';
import Cookie from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

const AuthorizedRoute = props => {
  const token = Cookie.get('token');

  if (!token) {
    return <Redirect to='/login' />;
  }

  return <Route {...props} />;
};

export default AuthorizedRoute;
