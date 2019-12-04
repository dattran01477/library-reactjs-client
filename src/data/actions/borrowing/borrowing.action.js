import Axios from "axios";
import { BASE_API } from "../../../share/constants";
import qs from "querystring";
export const SAVE_BORROWING = "SAVE_BOROWING";
export const UPDATE_BORROWING = "UPDATE_BORROWING";
export const BORROWING_NAME = "BORROWING_NAME";

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
    request.then(response =>
      dispatch({
        type: SAVE_BORROWING,
        borrowItem: response.data.phieumuon
      })
    );
}
