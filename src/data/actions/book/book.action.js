import { BASE_API } from "../../../share/constants";
import Axios from "axios";
export const GET_BOOKS = "GET_BOOKS";


export function getBooks() {
  const request = Axios.get(`${BASE_API}/books`);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_BOOKS,
        payload: response.data
      })
    );
}
