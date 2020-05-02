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
import GCallback from "./GithubCallback";
import KCallback from "./KakaoCallback";

import { Provider } from "react-redux";
import store from "./Store";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Provider store={store}>
          <Route path="/" exact component={Home} />
          <Route path="/info" exact component={Info} />
          <Route path="/callback/github" exact component={GCallback} />
          <Route path="/callback/kakao" exact component={KCallback} />
        </Provider>
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
