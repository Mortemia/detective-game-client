import React from 'react';
import AppRouter from './routers/AppRouter';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import UserProvider from './context/userContext';
import GameProvider from './context/gameContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GameProvider>
        <UserProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </UserProvider>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
