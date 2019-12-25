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

export function addComment(commentForm, idBook, successComment) {
  const request = Axios.post(
    `${BASE_API}/books/${idBook}/reviews`,
    commentForm
  );

  return dispatch =>
    request.then(response => {
      successComment(response.data);
    });
}

export function getComment(idBook, successComment) {
  const request = Axios.get(`${BASE_API}/books/${idBook}/reviews`);

  return dispatch =>
    request.then(response => {
      successComment(response.data);
    });
}
