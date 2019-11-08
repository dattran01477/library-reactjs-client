import * as types from "../action-type";

export const AddTempCart = data => ({
    type: types.ADD_BOOK_CART,
    bookId:data
  });
  