import axios from "axios";
import { logout } from "../service/authservice";

const axiosInstance = axios.create();
const axiosMultiPartInstance = axios.create();

// Request Interceptors
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    config.headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response Interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("RESPONSE");
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === "/app/auth/refresh-token"
    ) {
      // Refresh token has also expired, logout user
      logout();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

// Request Multipart Interceptors
axiosMultiPartInstance.interceptors.request.use(
  async (config) => {
    let access_token = localStorage.getItem("access_token");
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "multipart/form-data",
    };
    return config;
  },
  (error) => {
    console.log("INTERCEPTOR ERROR");
    Promise.reject({ error });
  }
);

// Response Multipart Interceptors
axiosMultiPartInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log("INTERCEPTOR RESPONSE ERROR: " + error);
    return Promise.reject(error);
  }
);

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  patch: axiosInstance.patch,
  postMultiPart: axiosMultiPartInstance.post,
};
