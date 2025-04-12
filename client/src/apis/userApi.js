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

export const fetch = async (id) => {
  return await get(`user/${id}`);
};

export const fetchs = async (page, limit) => {
  return await get(`user?page=${page}&limit=${limit}`);
};

export const create = async (data) => {
  return await axios.post(`${APP_URL}/user/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const update = async (data, id) => {
  return await axios.put(`${APP_URL}/user/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const profile = async (formData, id) => {
  const form = new FormData();
  form.append("upload", formData);

  return await axios.post(`${APP_URL}/user/image/${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const remove = async (id) => {
  return await axios.delete(`${APP_URL}/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
