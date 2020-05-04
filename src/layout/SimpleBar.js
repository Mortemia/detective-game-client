import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Logo from './Logo';
import AccountMenuIcon from '../layout/AccountMenuIcon';
import { AppContext } from '../context/appContext';

const SimpleBar = props => {
  const { appState } = React.useContext(AppContext);

  return (
    <AppBar position='static'>
      <Toolbar>
        <Logo />
        <Button color='inherit' component={Link} to='/play'>
          ROZGRYWKA
        </Button>
        <Button color='inherit'>KREATOR</Button>
        {appState.user ? (
          <AccountMenuIcon />
        ) : (
          <Button color='inherit' component={Link} to='/login'>
            Zaloguj się
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default SimpleBar;
