import { BASE_API } from "../../../share/constants";
import Axios from "axios";
import Cookies from "universal-cookie";
export const GET_BOOKS = "GET_BOOKS";
export const ADD_ITEM = "ADD_ITEM";
export const CART_NAME = "borrowingCart";

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
  const cookies = new Cookies();
  cookies.set(CART_NAME, JSON.stringify(cartItem), { path: "/app" });
  console.log(cookies.get(CART_NAME));
  return {
    type: ADD_ITEM,
    cartItem: cartItem
  };
}
