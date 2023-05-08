import ApiResponseModel from "../model/ApiResponseModel";
import * as endpoint from "../constants/apiendpoints";
import axios from "axios";

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


export async function refreshToken() {
  const refresh_token = localStorage.getItem("refresh_token");
  console.log("REFRESH_TOKEN: ", refresh_token);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
        "Content-Type": "applicatino/json",
      },
    };
    const response = await axios.get(
      endpoint.RENEW_ACCESS_TOKEN,
      config
    );
    localStorage.setItem("access_token", response.data.payload);
    return true;
  } catch (error) {
    logout();
    window.location.replace("/");
    return false;
  }
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
