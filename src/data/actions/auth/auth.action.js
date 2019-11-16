import Axios from "axios";
import {BASE_API} from "../../../share/constants"

export const SAVE_KEYCLOAK = "SAVE_KEYCLOAK";
export const FETCH_EXCHANGE_SERVER = "FETCH_EXCHANGE_SERVER";
export const LOGOUT = "LOGOUT";

export function saveKeycloak(keycloak) {
  Axios.defaults.headers.common["Authorization"] = "Bearer "+keycloak.token;
  return {
    type: SAVE_KEYCLOAK,
    keycloak: keycloak
  };
}

export function exchangeAuthWithServer() {
  const request = Axios.get(`${BASE_API}auth`);

  return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : FETCH_EXCHANGE_SERVER,
                authDetail: response.data
            })
        );
}
