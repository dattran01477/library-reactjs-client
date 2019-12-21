import Axios from "axios";
import qs from "querystring";
import { BASE_API } from "../../../share/constants";
export const GET_BOOK_DETAIL = "GET_BOOK_DETAIL";
export const ADD_COMMENT = "ADD_COMMENT";
export function getBookDetail(bookId) {
  const request = Axios.get(`${BASE_API}/books/${bookId}`);
  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_BOOK_DETAIL,
        bookDetail: response.data
      })
    );
}

export function addComment(commentForm,idBook) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

  const request = Axios.post(
    `${BASE_API}/api/bookDetails/comment`,
    qs.stringify(commentForm),
    config
  );
  
  return dispatch =>
    request.then(response => {
      dispatch(getBookDetail(idBook));
    });
}
