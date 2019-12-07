import Axios from "axios";
import { BASE_API } from "../../../share/constants";
import Cookies from "universal-cookie";
import qs from "querystring";
export const SAVE_BORROWING = "SAVE_BOROWING";
export const UPDATE_BORROWING = "UPDATE_BORROWING";
export const BORROWING_NAME = "BORROWING_NAME";
export const GET_BORROWING_DETAIL = "GET_BORROWING_DETAIL";

export const CART_NAME = "borrowingCart";

export function saveBorrowing(borrowItem) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const request = Axios.post(
    `${BASE_API}/api/borrowings`,
    qs.stringify(borrowItem),
    config
  );

  return dispatch =>
    request.then(response => {
      const cookies = new Cookies();
      cookies.remove(CART_NAME, { path: "/app" });
      dispatch({
        type: SAVE_BORROWING,
        borrowItem: response.data.phieumuon
      });
    });
}

export function getBorrowingDetail(idBorrowing) {
  const request = Axios.get(`${BASE_API}/api/borrowings/${idBorrowing}`);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_BORROWING_DETAIL,
        borrowingDetail: response.data
      })
    );
}
