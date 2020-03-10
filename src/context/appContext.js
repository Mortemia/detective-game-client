import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';

export const AppContext = createContext();

const initialState = {
  snackbar: { visible: false },
};

const AppProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(reducer, {
    initialState,
  });

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
