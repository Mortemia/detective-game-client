import React from 'react';
import AppRouter from './routers/AppRouter';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import UserProvider from './context/userContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
