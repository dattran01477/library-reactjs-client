import * as Action from "../../actions/action-type";

const initState = {
  data: {},
  searchCriteria: {},
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
    default:
      return state;
  }
}

export default book;
