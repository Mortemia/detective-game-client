import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Logo from './Logo';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const SimpleBar = () => {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Logo />
        <Button color='inherit' component={Link} to='/play'>
          ROZGRYWKA
        </Button>
        <Button color='inherit'>KREATOR</Button>
        <Button color='inherit'>Zaloguj się</Button>
      </Toolbar>
    </AppBar>
  );
};

export default SimpleBar;
