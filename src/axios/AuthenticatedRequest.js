import axios from "axios";

const axiosInstance = axios.create();
const axiosMultiPartInstance = axios.create();

// Request Interceptors
axiosInstance.interceptors.request.use(
  async (config) => {
    let access_token = localStorage.getItem("access_token");
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    console.log("INTERCEPTOR ERROR");
    Promise.reject({ error });
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
