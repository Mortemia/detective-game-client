import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import GameplayRouter from ".//GameplayRouter";
import CreatorRouter from ".//CreatorRouter";
import Home from "../Home/index"

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/play" component={GameplayRouter} />
        <Route path="/creator" component={CreatorRouter} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
