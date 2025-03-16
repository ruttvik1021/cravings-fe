"use client";
import axios, { AxiosHeaders } from "axios";
import { getCookie } from "cookies-next";

const getHeaders = (auth: boolean) => {
  const headers = new AxiosHeaders();
  if (auth) {
    const token = getCookie("token");
    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return headers;
};

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ENV === "development"
      ? process.env.NEXT_PUBLIC_DEV_URL
      : process.env.NEXT_PUBLIC_LOCAL_URL,
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        return Promise.reject({ isCanceled: true, ...error });
      }
    }
    return Promise.reject(error.response.data);
  }
);

const postAjax = async (url: string, data: any, auth: boolean) => {
  return await axiosInstance.post(url, data, {
    headers: getHeaders(auth),
  });
};

const putAjax = (url: string, data: any, auth: boolean) => {
  return axiosInstance.put(url, data, {
    headers: getHeaders(auth),
  });
};

const deleteAjax = (url: string, auth: boolean) => {
  return axiosInstance.delete(url, {
    headers: getHeaders(auth),
  });
};

const getAjax = (url: string, auth: boolean) => {
  return axiosInstance.get(url, {
    headers: getHeaders(auth),
  });
};

const patchAjax = (url: string, data: any, auth: boolean) => {
  return axiosInstance.patch(url, data, {
    headers: getHeaders(auth),
  });
};

export const AjaxUtils = {
  getAjax,
  deleteAjax,
  putAjax,
  postAjax,
  patchAjax,
};
