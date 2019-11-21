import Keycloak from "keycloak-js";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from 'redux-thunk'
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import reducer from "./data/reducer/book";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(()=>console.log(store.getState()));
ReactDOM.render(
  <Provider store={store}>
    {/* <Auth> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </Auth> */}
  </Provider>,
  document.getElementById("root")
);
export default store;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
