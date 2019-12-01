import { combineReducers } from "redux";
import books from "../reducer/book";
import auth from "../reducer/auth/auth.reducer";
import borrowing from "../reducer/borrowing/borrowing.reducer";
import bookDetail from "../reducer/book-detail/book-detail.reducer";

const reducer = combineReducers({
  books,
  auth,
  borrowing,
  bookDetail
});

export default reducer;
