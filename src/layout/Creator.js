import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import CreatorRouter from '../routers/CreatorRouter';
import CustomizedSnackbars from '../components/Snackbar';
import { AppContext } from '../context/appContext';
import { GameContext } from '../context/gameContext';
import Drawer from './CreatorDrawer';
import CreatorBar from './CreatorBar';

const Creator = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const { game } = React.useContext(GameContext);
  const snackbar = appState.snackbar;
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      {!appState.created_case_id ? (
        <Redirect to='/dashboard' />
      ) : (
        <Drawer open={open} handleDrawerClose={handleDrawerClose}>
          <CreatorBar open={open} handleDrawerOpen={handleDrawerOpen} />
          <CreatorRouter />
          <CustomizedSnackbars
            open={snackbar && snackbar.visible}
            message={snackbar && snackbar.message}
            severity={snackbar && snackbar.severity}
            onClick={() => appDispatch({ type: 'CLOSE_SNACKBAR', message: '' })}
          />
        </Drawer>
      )}
    </>
  );
};

export default Creator;
