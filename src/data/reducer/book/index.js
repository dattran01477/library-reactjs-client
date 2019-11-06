import { FETCH_BOOK_SUCCESS, FETCH_BOOK_CAROUSEL_SUCCESS, FETCH_BOOK_DETAIL } from "../../actions/action-type";

const initState={
  bookDetail:{}
}

function books(state = {...initState}, action) {
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
    case FETCH_BOOK_DETAIL:
      return {
        ...state,
        bookDetail:action.bookDetail
      } 
    default:
      return state;
  }
}

export default books;
