import ApiResponseModel from "../model/ApiResponseModel";
import * as endpoint from "../constants/apiendpoints";
import axios from "axios";
import { useHistory } from 'react-router-dom';

export async function login(user) {
    let apiResponse = new ApiResponseModel();
    try {
      let res = await axios.post(endpoint.AUTHENTICATE, {
        username: user.username,
        password: user.password,
      });
      console.log(res.data);
      apiResponse.success = res.data.success;
      apiResponse.message = res.data.message;
      apiResponse.response_code = res.data.response_code;
      apiResponse.payload = res.data.payload;
      apiResponse.timestamp = res.data.timestamp;
    } catch (e) {
      console.log(e);
    }
    return apiResponse;
  }

  // const refreshToken = async () => {
  //   try {
  //     const response = await axios.post('/app/token/refresh-token', {
  //       refresh_token: localStorage.getItem('refresh_token')
  //     });
  //     localStorage.setItem('access_token', response.data.access_token);
  //     return Promise.resolve(response.data.access_token);
  //   } catch (error) {
  //     localStorage.removeItem('access_token');
  //     localStorage.removeItem('refresh_token');
  //     // Navigate to the login page
  //     history.push('/login');
  //     return Promise.reject(error);
  //   }
  // };

  export async function refreshToken() {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await axios.post("/app/auth/refresh-token", {
        refreshToken: refreshToken,
      });
      localStorage.setItem("access_token", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw error;
    }
  }

  export function logout(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  