import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import GameplayRouter from '../routers/GameplayRouter';
import CustomizedSnackbars from '../components/Snackbar';
import { AppContext } from '../context/appContext';
import { GameContext } from '../context/gameContext';
import Drawer from './GameplayDrawer';
import GameplayBar from './GameplayBar';

const Gameplay = () => {
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
      {!game ? (
        <Redirect to='/dashboard' />
      ) : (
        <Drawer open={open} handleDrawerClose={handleDrawerClose}>
          <GameplayBar open={open} handleDrawerOpen={handleDrawerOpen} />
          <GameplayRouter />
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

export default Gameplay;
