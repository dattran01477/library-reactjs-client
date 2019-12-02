import * as Action from "../../actions/action-type";
import { NUMBER_OBJECT_PAGE } from "../../../share/constants";

const initState = {
  data: {},
  searchCriteria: {
    limit: NUMBER_OBJECT_PAGE,
    skip: 0
  },
  cartItem: []
};

function book(state = initState, action) {
  switch (action.type) {
    case Action.GET_BOOKS:
      return {
        ...state,
        data: action.payload
      };
    case Action.ADD_ITEM:
      return {
        ...state,
        cartItem: action.cartItem
      };
    case Action.CHANGE_CRITERIA:
      return {
        ...state,
        searchCriteria: action.criteria
      };
    default:
      return state;
  }
}

export default book;
