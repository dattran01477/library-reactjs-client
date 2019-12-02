import * as Action from "../../actions/action-type";

const initState = {
  keycloak: null,
  auth: null,
  authentication: false
};

function auth(state = initState, action) {
  switch (action.type) {
    case Action.SAVE_KEYCLOAK:
      return {
        ...state,
        keycloak: action.keycloak
      };
    case Action.FETCH_EXCHANGE_SERVER:
      return {
        ...state,
        auth: action.authDetail
      };
    case Action.SET_AUTHENTICATION:
      return {
        ...state,
        authentication: action.isAuthentication
      };
    default:
      return state;
  }
}

export default auth;
