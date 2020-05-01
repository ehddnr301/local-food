import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "../Routes/Header";
import Home from "../Routes/Home";
import Info from "../Routes/Info";
import Callback from "./GithubCallback";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/info" exact component={Info} />
        <Route path="/callback" exact component={Callback} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
