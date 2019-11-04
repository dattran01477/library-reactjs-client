import * as types from "../action-type";

export const actFetchBooks = data => ({
  type: types.FETCH_BOOK_SUCCESS,
  bookResults: data
});

export const actFetchBooksCarousel = data => ({
  type: types.FETCH_BOOK_CAROUSEL_SUCCESS,
  bookCarouselResults: data
});

export const actFetchBookDetail = data => ({
  type: types.FETCH_BOOK_DETAIL,
  bookDetail:data
})
