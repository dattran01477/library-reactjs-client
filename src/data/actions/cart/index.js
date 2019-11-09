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

export const resetTempCartItem = () => ({
  type: types.RESET_BOOK_CART
});

//object
export const fetchBooksObjectCart = data =>({
  type: types.FETCH_BOOK_OBJECT_CART,
  bookData:data
})

export const resetBooksObjectCart = () =>({
  type: types.RESET_BOOK_OBJECT_CART
})

