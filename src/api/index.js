import axios from "axios";
import { BASE_API } from "../share/constants";

const call = axios.create({
  baseURL: BASE_API,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const callApiAsPromise = (method, url, params, body) => {
  return call({
    method: method,
    url: BASE_API + url,
    params: params,
    data: body
  });
};
