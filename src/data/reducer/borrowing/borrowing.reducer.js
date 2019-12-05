import * as Action from "../../actions/action-type";
import axios from "axios";

const initState = {
  borrowItem: null,
  borrowDetail: null
};

function borrowing(state = initState, action) {
  switch (action.type) {
    case Action.SAVE_BORROWING:
      return {
        ...state,
        borrowItem: action.borrowItem
      };
    case Action.GET_BORROWING_DETAIL:
      return {
        ...state,
        borrowDetail: action.borrowingDetail
      };
    default:
      return {
        ...state
      };
  }
}

export default borrowing;
