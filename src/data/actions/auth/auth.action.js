import qs from "querystring";
import Axios from "axios";
import { BASE_API } from "../../../share/constants";
import Login from "../../../components/login";

export const SAVE_KEYCLOAK = "SAVE_KEYCLOAK";
export const FETCH_EXCHANGE_SERVER = "FETCH_EXCHANGE_SERVER";
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";

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

export function login(form) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  };

  const request = Axios.post(
    `${BASE_API}/auth/login`,
    qs.stringify(form),
    config
  );


    request.then(response => 
      console.log(response)
    )
    
}

export function getUserInfo(idUser){
  const request = Axios.get(`${BASE_API}/api/profiles/${idUser}`);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: FETCH_EXCHANGE_SERVER,
        authDetail: response.data
      })
    );
}
