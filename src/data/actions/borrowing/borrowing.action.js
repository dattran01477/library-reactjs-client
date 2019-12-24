import Axios from "axios";
import Cookies from "universal-cookie";
import { BASE_API } from "../../../share/constants";
export const SAVE_BORROWING = "SAVE_BOROWING";
export const UPDATE_BORROWING = "UPDATE_BORROWING";
export const BORROWING_NAME = "BORROWING_NAME";
export const GET_BORROWING_DETAIL = "GET_BORROWING_DETAIL";

export const CART_NAME = "borrowingCart";

export function saveBorrowing(borrowItem,successFunc) {
  const request = Axios.post(`${BASE_API}/borrowing-card`, borrowItem);

  return dispatch =>
    request.then(response => {
      const cookies = new Cookies();
      cookies.remove(CART_NAME, { path: "/app" });
      successFunc();
      dispatch({
        type: SAVE_BORROWING,
        borrowItem: response.data
      });
    });
}

export function getBorrowingDetail(idBorrowing) {
  const request = Axios.get(`${BASE_API}/borrowing-card/${idBorrowing}`);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_BORROWING_DETAIL,
        borrowingDetail: response.data
      })
    );
}
