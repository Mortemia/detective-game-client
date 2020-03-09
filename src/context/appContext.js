import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(reducer, {
    snackbar: { visible: false },
  });

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
