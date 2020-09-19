import React from "react";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import RaceResults from "./pages/RaceResults";
import SeasonDetails from "./pages/SeasonDetails";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/season/:season" exact component={SeasonDetails} />
      <Route path="/season/:season/race/:race" exact component={RaceResults} />
    </Switch>
  );
};

export default Router;
