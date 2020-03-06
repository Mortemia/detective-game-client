import React, { useContext } from 'react';
import GameplayRouter from '../routers/GameplayRouter';
import CustomizedSnackbars from '../components/Snackbar';
import { AppContext } from '../context/appContext';
import Drawer from './Drawer';

const Gameplay = () => {
  const { appState, appDispatch } = useContext(AppContext);

  return (
    <Drawer>
      <GameplayRouter />
      <CustomizedSnackbars
        open={appState.visible}
        message={appState.message}
        severity={appState.severity}
        onClick={() => appDispatch({ type: 'CLOSE_SNACKBAR', message: '' })}
      />
    </Drawer>
  );
};

export default Gameplay;
