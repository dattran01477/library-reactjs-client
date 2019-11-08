import { FETCH_BOOK_SUCCESS, FETCH_BOOK_DETAIL, ADD_BOOK_CART, DELETE_BOOK_CART, GET_BOOK_CART } from "../../actions/action-type";
var redux = require('redux');

const booksInitialState = [];
let booksArray = [];
const booksReducer = (state = booksInitialState, action) => {
  booksArray = [];
  switch (action.type) {
    case FETCH_BOOK_SUCCESS:
      for (let obj in action.bookResults) {
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
      return state
  }
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}

const distinct = (value,index,self)=>{
  return self.indexOf(value) ===index;
}

const bookCartInitialState = []
const bookCart = (state = bookCartInitialState, action) => {
  if (getCookie("bookCart")) {
    state = JSON.parse(getCookie("bookCart"));
  }
  switch (action.type) {
    case GET_BOOK_CART:
      return [...state];
    case ADD_BOOK_CART:
      let jsonCookie = JSON.stringify([...state, action.bookId].filter((x, i, a)=>distinct(x,i,a)));
      document.cookie = "bookCart=" + jsonCookie;
      return [...state, action.bookId].filter((x, i, a)=>distinct(x,i,a))
    case DELETE_BOOK_CART:
      return [state.filter(value => value !== action.bookId)]
    default:
      return state
  }
}
const reducer = redux.combineReducers({
  bookDetail: bookDetailReducer,
  bookResults: booksReducer,
  tempCart: bookCart
})
export default reducer;
