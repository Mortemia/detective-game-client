import React, { useContext } from 'react';
import GameplayRouter from '../routers/GameplayRouter';
import CustomizedSnackbars from '../components/Snackbar';
import { AppContext } from '../context/appContext';
import Drawer from './Drawer';

const Gameplay = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const snackbar = appState.snackbar;

  return (
    <Drawer>
      <GameplayRouter />
      <CustomizedSnackbars
        open={snackbar && snackbar.visible}
        message={snackbar && snackbar.message}
        severity={snackbar && snackbar.severity}
        onClick={() => appDispatch({ type: 'CLOSE_SNACKBAR', message: '' })}
      />
    </Drawer>
  );
};

export default Gameplay;
