import axios from "axios";
import { logout, refreshToken } from "../service/authservice";

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

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const access_token = await refreshToken();
        originalConfig.headers["Authorization"] = `Bearer ${access_token}`;
        return axiosInstance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const accessToken = await refreshToken();
        originalRequest.headers["Authorization"] = "Bearer " + accessToken;
        return axiosInstance(originalRequest);
      } catch (error) {
        logout();
        window.location.replace("/");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
// Response Interceptors
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     console.log("INTERCEPTOR RESPONSE ERROR: " + error);
//     const orginalRequest = error.config;
//     if (error.response.status === 403 && !orginalRequest._retry) {
//       orginalRequest._retry = true;
//       // refresh token here
//       //const test = await refreshAccessToken();
//       //const access_token = test;
//       //axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//       return axiosInstance(orginalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// Request Interceptors
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

// Response Interceptors
axiosMultiPartInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log("INTERCEPTOR RESPONSE ERROR: " + error);
    const orginalRequest = error.config;
    if (error.response.status === 403 && !orginalRequest._retry) {
      orginalRequest._retry = true;
      // refresh token here
      //const test = await refreshAccessToken();
      //const access_token = test;
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return axiosInstance(orginalRequest);
    }
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
