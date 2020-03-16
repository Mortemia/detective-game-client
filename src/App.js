import React from 'react';
import T from 'i18n-react';
import AppRouter from './routers/AppRouter';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import GameProvider from './context/gameContext';
import AppProvider from './context/appContext';

const dictionary = require('./localization/translations/pl.json');
T.setTexts(dictionary);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <GameProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </GameProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
