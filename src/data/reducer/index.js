import { combineReducers } from "redux";
import books from "../reducer/book";
import auth from "../reducer/auth/auth.reducer"
import borrowing from "../reducer/borrowing/borrowing.reducer"

const reducer = combineReducers({
  books,
  auth,
  borrowing
});

export default reducer;
