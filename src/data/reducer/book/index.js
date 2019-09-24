import { FETCH_BOOK_SUCCESS } from "../../actions/action-type";

function books(state = {}, action) {
  switch (action.type) {
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        bookResults: action.bookResults
      };
    default:
      return state;
  }
}

export default books;
