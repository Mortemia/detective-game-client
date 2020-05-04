import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import GameAPI from '../api/GameAPI';

export const GameContext = createContext();

const gameAPI = new GameAPI();

const GameProvider = ({ children }) => {
  const [game, dispatch] = useReducer(reducer, null);

  React.useEffect(() => {
    game && gameAPI.saveDetectiveCase(game);
  }, [game]);

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
