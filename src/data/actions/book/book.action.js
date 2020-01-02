import Axios from "axios";
import { BASE_API } from "../../../share/constants";
export const GET_BOOKS = "GET_BOOKS";
export const ADD_ITEM = "ADD_ITEM";
export const CART_NAME = "borrowingCart";
export const CHANGE_CRITERIA = "CHANGE_CRITERIA";

export function getBooks(criteria) {
  const request = Axios.get(`${BASE_API}/books`, { params: criteria });
  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_BOOKS,
        payload: response.data
      })
    );
}

export function getTopBooks(funcSuccess, funcFail) {
  const request = Axios.get(`${BASE_API}/books/top-book`);
  request
    .then(response => funcSuccess(response.data))
    .catch(err => funcFail(err));
}

export function addToCart(cartItem) {
  localStorage.setItem(CART_NAME, JSON.stringify(cartItem));
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

export function getCategories(successFunc) {
  const request = Axios.get(`${BASE_API}/categories`);

  request.then(response => successFunc(response.data, "categories"));
}

export function getAuthors(successFunc) {
  const request = Axios.get(`${BASE_API}/authors`);

  request.then(response => successFunc(response.data, "authors"));
}

export function getLanguage(successFunc) {
  const request = Axios.get(`${BASE_API}/languages`);

  request.then(response => successFunc(response.data, "languages"));
}

export function getBookByIds(ids) {
  let books = [];
  ids &&
    ids.map(item =>
      Axios.get(`${BASE_API}/books/${item}`).then(res => books.push(res.data))
    );
  return books;
}
