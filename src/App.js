import React, { useState, useEffect } from "react";
import { Router, Redirect } from "@reach/router";
import { routeUrl } from "./constants";

import "antd/dist/antd.css";
import "./index.scss";

import { HomePage, PostPage } from "./pages";

import { observer } from "mobx-react-lite";

const App = observer(() => {
  return (
    <>
      <Router basepath={`${routeUrl === "" ? "/" : routeUrl}`}>
        <HomePage path="home" />
        <PostPage path="post/:page" />
        <Redirect from="/" to={`${routeUrl}/home`} noThrow />
      </Router>
    </>
  );
});

export default App;
