import React, { useState, useEffect } from "react";
import { Router, Redirect } from "@reach/router";
import { Button, notification } from "antd";
import { routeUrl } from "./constants";

import "antd/dist/antd.css";
import "./index.scss";

import { HomePage, PostPage } from "./pages";

import { observer } from "mobx-react-lite";
import { useStores } from "./hooks/useStores";

import { SocketManager } from "./utils";
import { BASE_WS_URL } from "./api/consts";

// import { Footer, Header, RootModal } from "./components";
// import { WalletIcon, ExchangeIcon, DashboardIcon } from "./Icons";

const App = observer(() => {
  // Стейт запуска
  const isDesktop = window.innerWidth >= 1000;
  const { UserStore, SnackbarStore, WsStore } = useStores();
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(null);
  const [wsConnecting, setWsConnecting] = useState(false);
  // Стейт приложения
  // const [activeModal, setActiveModal] = useState(null);

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
