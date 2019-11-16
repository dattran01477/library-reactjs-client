import * as Action from "../../actions/action-type";

const initState = {
  keycloak: null,
  auth: null
};

function books(state = initState, action) {
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
    default:
      return state;
  }
}

export default books;
