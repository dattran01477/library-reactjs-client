import Keycloak from "keycloak-js";
import React from "react";
import ReactDOM from "react-dom";
import { KeycloakProvider } from "react-keycloak";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import App from "./App";
import reducer from "./data/reducer";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "./index.css"

// Setup Keycloak instance as needed
const keycloak = new Keycloak("/keycloak.json");
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
ReactDOM.render(
  <KeycloakProvider keycloak={keycloak}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </KeycloakProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
