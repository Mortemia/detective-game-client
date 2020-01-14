import React from "react";
import Home from '../Home'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const CreatorRouter = () => {
  return (
    <Router>
      <div>CreatorRouter</div>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default CreatorRouter;
