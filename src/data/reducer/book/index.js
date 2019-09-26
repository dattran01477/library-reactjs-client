import { FETCH_BOOK_SUCCESS, FETCH_BOOK_CAROUSEL_SUCCESS } from "../../actions/action-type";

function books(state = {}, action) {
  switch (action.type) {
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        bookResults: action.bookResults
      };
    case FETCH_BOOK_CAROUSEL_SUCCESS:
      return {
        ...state,
        bookCarouselResults: action.bookCarouselResults
      };
    default:
      return state;
  }
}

export default books;
