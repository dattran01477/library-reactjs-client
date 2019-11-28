import { BASE_API } from "../../../share/constants";
import Axios from "axios";
export const GET_BOOKS = "GET_BOOKS";
export const ADD_ITEM = "ADD_ITEM";

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

export function addToCart(cartItem) {
  return {
    type: ADD_ITEM,
    cartItem: cartItem
  };
}
