import React from "react";
import Home from '../pages/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const GameplayRouter = () => {
  return (
    <Router>
      <div>GameplayRouter</div>
      <Switch>
        <Route  path="/play/actions" render={(props) => <Home hello="akcje"/>} />
      </Switch>
    </Router>
  );
};

export default GameplayRouter;
