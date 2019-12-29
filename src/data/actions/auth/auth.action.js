import Axios from "axios";
import qs from "querystring";
import { BASE_API } from "../../../share/constants";
export const SAVE_KEYCLOAK = "SAVE_KEYCLOAK";
export const FETCH_EXCHANGE_SERVER = "FETCH_EXCHANGE_SERVER";
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const SET_LOGOUT = "SET_LOGOUT";
export const LOGIN = "LOGIN";
export const SET_REFRESH_CHECK_VERIFY = "SET_REFRESH_CHECK_VERIFY";
export const CHAGE_PASSWORD = "CHAGE_PASSWORD";
export const SEND_EMAIL_RESET = "SEND_EMAIL_RESET";
export const REGISTER = "REGISTER";
export const SET_ISSUCCESS = "SET_ISSUCCESS";
export const UPDATE_INFO = "UPDATE_INFO";

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

export function exchangeAuthWithServer(error) {
  const request = Axios.get(`${BASE_API}/auth`);

  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: FETCH_EXCHANGE_SERVER,
          authDetail: response.data
        })
      )
      .catch(err => {
        if (err.response.status === 401) {
          error(401);
        }
      });
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
      if (response.data.data !== null) {
        localStorage.setItem("jwt", response.data.data.token);
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

export function updateProfile(form, idUser, successFunction) {
  const request = Axios.put(`${BASE_API}/users/${idUser}`, form);
  return dispatch =>
    request.then(response => {
      console.log("xxx")
      successFunction();
    });
}

export function register(username, password) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

  const request = Axios.post(
    `${BASE_API}/auth/registry`,
    qs.stringify({ username: username, password: password }),
    config
  );

  return dispatch =>
    request.then(response => {
      if (response.data.status === "fail") {
        dispatch({
          type: REGISTER,
          isSuccess: false
        });
      }
      if (response.data.status === "success") {
        dispatch({
          type: REGISTER,
          isSuccess: true
        });
      }
    });
}

export function sendEmailResetPassword(email) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

  const request = Axios.post(
    `${BASE_API}/api/emailservice/reset`,
    qs.stringify({ email: email }),
    config
  );

  return dispatch =>
    request.then(response => {
      if (response.data.status === "fail") {
        dispatch({
          type: CHAGE_PASSWORD,
          isSuccess: false
        });
      }
      if (response.data.status === "success") {
        dispatch({
          type: CHAGE_PASSWORD,
          isSuccess: true
        });
      }
    });
}

export function ChangePassword(id, password) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

  const request = Axios.put(
    `${BASE_API}/api/users/updatepassword/${id}`,
    qs.stringify({ password: password }),
    config
  );

  return dispatch =>
    request.then(response => {
      dispatch({
        type: CHAGE_PASSWORD,
        isSuccess: true
      });
    });
}

export function getUserInfo(idUser) {
  const request = Axios.get(`${BASE_API}/api/profiles/${idUser}`);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: FETCH_EXCHANGE_SERVER,
        authDetail: response.data
      })
    );
}

export function setIsSuccess(isSuccess) {
  return {
    type: SET_ISSUCCESS,
    isSuccess: isSuccess
  };
}
