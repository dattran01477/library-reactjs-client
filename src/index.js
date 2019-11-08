import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
export default store;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
