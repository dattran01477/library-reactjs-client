import { BASE_API } from "../../../share/constants";
import Axios from "axios";
import Cookies from "universal-cookie";
export const GET_BOOKS = "GET_BOOKS";
export const ADD_ITEM = "ADD_ITEM";
export const CART_NAME = "borrowingCart";
export const CHANGE_CRITERIA = "CHANGE_CRITERIA";

export function getBooks(criteria) {
  const request = Axios.get(`${BASE_API}/api/books`, { params: criteria });
  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_BOOKS,
        payload: response.data
      })
    );
}

export function addToCart(cartItem) {
  const cookies = new Cookies();
  cookies.set(CART_NAME, JSON.stringify(cartItem), { path: "/app" });
  return {
    type: ADD_ITEM,
    cartItem: cartItem
  };
}

export function changeCriteria(criteria) {
  return {
    type: CHANGE_CRITERIA,
    criteria: criteria
  };
}
