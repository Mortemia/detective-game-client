import React from "react";
import "./App.css";
import MainRouter from "./routers/MainRouter";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <MainRouter />
    </div>
    </ThemeProvider>
  );
}

export default App;
