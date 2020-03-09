import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logo from './Logo';
import { AppContext } from '../context/appContext';

const SimpleBar = props => {
  const { appState } = React.useContext(AppContext);

  return (
    <AppBar position='static'>
      <Toolbar>
        <Logo />
        <Typography>{appState.user && appState.user.username}</Typography>
        <Button color='inherit' component={Link} to='/play'>
          ROZGRYWKA
        </Button>
        <Button color='inherit'>KREATOR</Button>
        <Button color='inherit' component={Link} to='/login'>
          Zaloguj się
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default SimpleBar;
