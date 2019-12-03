import qs from "querystring";
import Axios from "axios";
import { BASE_API } from "../../../share/constants";
import Login from "../../../components/login";

export const SAVE_KEYCLOAK = "SAVE_KEYCLOAK";
export const FETCH_EXCHANGE_SERVER = "FETCH_EXCHANGE_SERVER";
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const SET_LOGOUT = "SET_LOGOUT";
export const LOGIN = "LOGIN";
export const SET_REFRESH_CHECK_VERIFY = "SET_REFRESH_CHECK_VERIFY";

export function saveKeycloak(keycloak) {
  Axios.defaults.headers.common["Authorization"] = "Bearer " + keycloak.token;
  return {
    type: SAVE_KEYCLOAK,
    keycloak: keycloak
  };
}

export function saveUser(user) {
  return {
    type: FETCH_EXCHANGE_SERVER,
    keycloak: user
  };
}

export function exchangeAuthWithServer() {
  const request = Axios.get(`${BASE_API}/auth`);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: FETCH_EXCHANGE_SERVER,
        authDetail: response.data
      })
    );
}

export function setAuthentication(isAuthentication) {
  if (isAuthentication === false) {
    localStorage.removeItem("jwt");
  }
  return {
    type: SET_AUTHENTICATION,
    isAuthentication: isAuthentication
  };
}

export function setRefreshVerifyLogin(isCheckVerify) {
  return {
    type: SET_REFRESH_CHECK_VERIFY,
    refeshVerifyLogin: isCheckVerify
  };
}

export function setIsLogout(isLogout) {
  return {
    type: SET_LOGOUT,
    isLogout: isLogout
  };
}

export function login(form) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

  const request = Axios.post(
    `${BASE_API}/auth/login`,
    qs.stringify(form),
    config
  );

  return dispatch =>
    request.then(response => {
      console.log(response);
      if (response.data.data !== null) {
        localStorage.setItem("jwt", response.data.token);
        dispatch({
          type: SET_REFRESH_CHECK_VERIFY,
          refeshVerifyLogin: true
        });
      } else {
        dispatch({
          type: SET_REFRESH_CHECK_VERIFY,
          refeshVerifyLogin: false
        });
      }
    });
}
