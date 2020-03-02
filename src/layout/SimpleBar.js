import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logo from './Logo';
import { UserContext } from '../context/userContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const SimpleBar = props => {
  const classes = useStyles();
  const { user } = React.useContext(UserContext);

  return (
    <AppBar position='static'>
      <Toolbar>
        <Logo />
        <Typography>{user && user.username}</Typography>
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
