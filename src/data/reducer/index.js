import { combineReducers } from "redux";
import books from "../reducer/book";
import auth from "../reducer/auth/auth.reducer"

const reducer = combineReducers({
  books,
  auth
});

export default reducer;
