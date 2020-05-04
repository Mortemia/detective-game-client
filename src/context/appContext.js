import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';

export const AppContext = createContext();

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  snackbar: { visible: false },
  user: user || null,
};

const AppProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
