import { APP_URL } from "../confidential";
import axios from "./../../node_modules/axios/lib/axios";

export const get = async (endpoint, params = {}) => {
  return axios.get(`${APP_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    params,
  });
};