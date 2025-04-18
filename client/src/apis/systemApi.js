import { APP_URL } from "../confidential";
import axios from "./../../node_modules/axios/lib/axios";
import { get } from "./userApi";

export const fetchs = async (page, limit) => {
  return await get(`system?page=${page}&limit=${limit}`);
};

export const fetch = async (id) => {
  return await get(`system/${id}`);
};

export const findById = async (id, page, limit) => {
  return await get(`system/findById/${id}?page=${page}&limit=${limit}`)
}

export const detection = async (imageSrc, userId) => {
  return await axios.post(`${APP_URL}/system/detection`, {
    image: imageSrc,
    userId,
  }, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};