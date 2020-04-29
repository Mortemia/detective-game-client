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
import { snackbars } from '../constants/snackbars';

const AccountMenuIcon = _ => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const { appState, appDispatch } = React.useContext(AppContext);
  const history = useHistory();

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    appDispatch({ type: 'LOGOUT' });
    let path = 'login';
    history.push(path);
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
        Zalogowano jako {appState.user && appState.user.username}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLogout();
          handleMenuClose();
          appDispatch({
            type: 'OPEN_SNACKBAR',
            snackbar: snackbars.successLogout,
          });
        }}
      >
        Wyloguj się
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <IconButton
        edge='end'
        aria-haspopup='true'
        aria-controls={menuId}
        onClick={handleProfileMenuOpen}
        color='inherit'
      >
        <AccountCircle />
      </IconButton>
      {renderMenu}
    </>
  );
};

export default AccountMenuIcon;
