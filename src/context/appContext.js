import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import jsonData from '../save.json';
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(reducer, {});

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
