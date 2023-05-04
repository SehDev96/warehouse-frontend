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