import { FETCH_BOOK_SUCCESS, FETCH_BOOK_DETAIL, ADD_BOOK_CART, DELETE_BOOK_CART, GET_BOOK_CART, FETCH_BOOK_OBJECT_CART, RESET_BOOK_OBJECT_CART, RESET_BOOK_CART } from "../../actions/action-type";
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

Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};

const bookCartInitialState = []
const bookCart = (state = bookCartInitialState, action) => {
  if (getCookie("bookCart")) {
    state = JSON.parse(getCookie("bookCart"));
  }
  let jsonCookie = "";
  switch (action.type) {
    case GET_BOOK_CART:
      return [...state];
    case ADD_BOOK_CART:
      jsonCookie = JSON.stringify([...state, action.bookId].filter((x, i, a)=>distinct(x,i,a)));
      document.cookie = "bookCart=" + jsonCookie;
      return state
    case DELETE_BOOK_CART:
      state.remove(action.bookId);
      jsonCookie = JSON.stringify(state);
      document.cookie = "bookCart=" + jsonCookie;
      return state;
    case RESET_BOOK_CART:
      state =[];
      document.cookie = "bookCart=";
      return state;
    default:
      return state
  }
}

const tempCartObjectReducerInitialState = []
const tempCartObjectReducer = (state = tempCartObjectReducerInitialState, action) => {
  switch (action.type) {
    case FETCH_BOOK_OBJECT_CART:
      return [...state,action.bookData]
    case RESET_BOOK_OBJECT_CART:
      state=[];
      return state;
    default:
      return state
  }
}
const reducer = redux.combineReducers({
  bookDetail: bookDetailReducer,
  bookResults: booksReducer,
  tempCart: bookCart,
  tempCartObject: tempCartObjectReducer
})
export default reducer;
