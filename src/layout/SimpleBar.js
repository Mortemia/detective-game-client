import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Logo from './Logo';
import { AppContext } from '../context/appContext';

const SimpleBar = (props) => {
  const history = useHistory();

  const { appState, appDispatch } = React.useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} disabled={true}>
        Zalogowano jako {appState.user && appState.user.usernameOrEmail}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLogout();
          handleMenuClose();
        }}
      >
        Wyloguj się
      </MenuItem>
    </Menu>
  );

  const handleLogout = () => {
    appDispatch({ type: 'LOGOUT' });
    let path = 'login';
    history.push(path);
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Logo />
        <Typography>{appState.user && appState.user.username}</Typography>
        <Button color='inherit' component={Link} to='/play'>
          ROZGRYWKA
        </Button>
        <Button color='inherit'>KREATOR</Button>
        {appState.user ? (
          <IconButton
            edge='end'
            aria-haspopup='true'
            aria-controls={menuId}
            onClick={handleProfileMenuOpen}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
        ) : (
          <Button color='inherit' component={Link} to='/login'>
            Zaloguj się
          </Button>
        )}
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default SimpleBar;
