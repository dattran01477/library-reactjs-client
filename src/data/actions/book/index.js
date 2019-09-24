import * as types from '../action-type'

export const actFetchBooks = data => ({
    type: types.FETCH_BOOK_SUCCESS,
    bookResults: data
  });