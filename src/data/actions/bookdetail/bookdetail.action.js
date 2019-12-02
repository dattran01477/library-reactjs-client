import Axios from "axios";
import { BASE_API } from "../../../share/constants";
import { Promise } from "q";
export const GET_BOOK_DETAIL = "GET_BOOK_DETAIL";
export function getBookDetail(bookId) {
  const request = Axios.get(`${BASE_API}/api/bookDetails/book/${bookId}`);
  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_BOOK_DETAIL,
        bookDetail: response.data
      })
    );
}
