import { callApiAsPromise } from "../../../api";

export const GET_USERS = "GET_USERS";

export const actGetUsers = () =>
  (getBookByCriteria = () => {
    callApiAsPromise("GET", "users", null, null)
      .then(res => {
        return {
          type: GET_USERS,
          payload: res.data
        };
      })
      .catch(err => {
        alert(err);
      });
});
