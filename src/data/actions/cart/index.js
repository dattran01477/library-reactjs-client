import * as types from "../action-type";

export const AddTempCart = data => ({
  type: types.ADD_BOOK_CART,
  bookId: data
});

export const GetTempCart = () => ({
  type: types.GET_BOOK_CART
});

export const DELTempCartItem = data => ({
  type: types.DELETE_BOOK_CART,
  bookId:data
});
