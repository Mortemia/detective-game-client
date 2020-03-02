import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, {});

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
