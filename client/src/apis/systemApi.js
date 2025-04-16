import { APP_URL } from "../confidential";
import axios from "./../../node_modules/axios/lib/axios";
import { get } from "./userApi";

export const fetchs = async (page, limit) => {
  return await get(`user?page=${page}&limit=${limit}`);
};

export const fetch = async (id) => {
  return await get(`user/${id}`);
};
