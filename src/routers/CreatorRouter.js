import React from "react";
import Home from '../pages/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
