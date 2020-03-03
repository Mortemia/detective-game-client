import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import jsonData from '../save.json';
export const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [game, dispatch] = useReducer(reducer, jsonData);

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
