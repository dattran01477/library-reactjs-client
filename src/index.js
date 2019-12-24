import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import Auth from "./components/auth/auth";
import Login from "./components/login";
import ResetPass from "./components/resetpass";
import reducer from "./data/reducer";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

// Setup Keycloak instance as needed
const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth>
        <Route path="/app" component={App} key="app" />
        <Route path="/login" component={Login} key="login" />
        <Route path="/reset" component={ResetPass} key="reset" />
      </Auth>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
export default store;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
