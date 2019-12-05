import * as Action from "../../actions/action-type";

const initState = {
  keycloak: null,
  auth: null,
  authentication: false,
  refeshVerifyLogin: false,
  isLogin: false,
  isLogout: false,
  isSuccess: false
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
    case Action.SET_REFRESH_CHECK_VERIFY:
      return {
        ...state,
        refeshVerifyLogin: action.refeshVerifyLogin
      };
    case Action.SET_LOGOUT:
      return {
        ...state,
        isLogout: action.isLogout
      };
    case Action.REGISTER:
      return {
        ...state,
        isSuccess: action.isSuccess
      };
    case Action.SET_ISSUCCESS:
      return {
        ...state,
        isSuccess: action.isSuccess
      };
    default:
      return state;
  }
}

export default auth;
