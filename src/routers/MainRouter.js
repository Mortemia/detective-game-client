import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import GameplayRouter from ".//GameplayRouter";
import CreatorRouter from ".//CreatorRouter";
import Home from '../pages/Home'
import HowToPlay from "../pages/HowToPlay";
import Dashboard from '../pages/Dashboard'
import SimpleBar from "../pages/Home/SimpleBar";

const MainRouter = () => {
  return (
    <Router>
    <SimpleBar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/howtoplay" component={HowToPlay} />
        <Route path="/dashboard" component={Dashboard} />

        <Route path="/play" component={GameplayRouter} />
        <Route path="/creator" component={CreatorRouter} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
