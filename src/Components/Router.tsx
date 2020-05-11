import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "./Header";
import Home from "../Routes/Home";
import Info from "../Routes/Info";
import GCallback from "../Routes/GithubCallback";
import KCallback from "../Routes/KakaoCallback";
import Err from "../Routes/Err";
import Profile from "../Routes/Profile";

import { Provider } from "react-redux";
import store from "./Store";

export default () => (
  <Router>
    <>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/info" exact component={Info} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/error" exact component={Err} />
          <Route path="/callback/github" exact component={GCallback} />
          <Route path="/callback/kakao" exact component={KCallback} />
          <Redirect from="*" to="/" />
        </Switch>
      </Provider>
    </>
  </Router>
);
