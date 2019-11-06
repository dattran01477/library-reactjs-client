import { FETCH_BOOK_SUCCESS, FETCH_BOOK_CAROUSEL_SUCCESS, FETCH_BOOK_DETAIL } from "../../actions/action-type";
var redux =require('redux');

const booksInitialState = [];
let booksArray=[];
const booksReducer = (state = booksInitialState, action) => {
  switch (action.type) {
    case FETCH_BOOK_SUCCESS:
      for(let obj in action.bookResults){
        booksArray.push(action.bookResults[obj]);
      }
      return (booksArray);
    default:
      return state
  }
}

const bookDetailInitialState = {};
const bookDetailReducer = (state = bookDetailInitialState, action) => {
  switch (action.type) {
    case FETCH_BOOK_DETAIL:
      console.log(action.bookDetail);
      return action.bookDetail;
    default:
      return state;
  }
}

const reducer=redux.combineReducers({
  bookDetail:bookDetailReducer,
  bookResults:booksReducer
})
export default reducer;
