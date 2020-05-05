import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import GameAPI from '../api/GameAPI';

export const GameContext = createContext();

const gameAPI = new GameAPI();

const retrieveSave = _ => {
  const save = localStorage.getItem('gameSave');
  return save ? JSON.parse(save) : null;
};

const GameProvider = ({ children }) => {
  const [game, dispatch] = useReducer(reducer, retrieveSave());

  React.useEffect(() => {
    if (game) {
      gameAPI.saveDetectiveCase(game);
      localStorage.setItem('gameSave', JSON.stringify(game));
    }
  }, [game]);

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
