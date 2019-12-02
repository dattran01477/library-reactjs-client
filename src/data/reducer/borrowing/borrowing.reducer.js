import * as Action from "../../actions/action-type";
import axios from "axios";

const initState = {
  borrowItem: null
};

function borrowing(state = initState, action) {
  switch (action.type) {
    case Action.SAVE_BORROWING:
      return {
        ...state,
        borrowItem: action.borrowItem
      };
    default:
      return {
        ...state
      };
  }
}

export default borrowing;
