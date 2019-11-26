import * as Action from "../../actions/action-type";

const initState = {
  data: {},
  searchCriteria: {}
};

function book(state = initState, action) {
  switch (action.type) {
    case Action.GET_BOOKS:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

export default book;
