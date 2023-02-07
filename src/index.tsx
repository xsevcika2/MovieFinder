import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Router from "./components/Router/Router";
import styles from "./index.module.scss";
import { Provider } from "react-redux";
import { store } from "./stores/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavBar className={styles} />
        <Router />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
