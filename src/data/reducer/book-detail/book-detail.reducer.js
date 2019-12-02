import * as Action from "../../actions/action-type";

const initState = {
  bookDetail: null
};

function bookDetail(state = initState, action) {
  switch (action.type) {
    case Action.GET_BOOK_DETAIL:
      return {
        ...state,
        bookDetail: action.bookDetail
      };
    default:
      return {
        ...state
      };
  }
}

export default bookDetail;
