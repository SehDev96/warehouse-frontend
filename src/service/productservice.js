import * as endpoints from "../constants/apiendpoints";
import AuthenticatedRequest from "../axios/AuthenticatedRequest";
import axios from "axios";
import ApiResponseModel from "../model/ApiResponseModel";

const token = localStorage.getItem("access_token");
//axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export async function insertProduct(data) {
  try {
    const response = await axios.post(endpoints.ADD_PRODUCT, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.log("Error Response: ", error.response.data);
      return error.response.data;
    }
  }
}

export async function addProductFromCsv(file) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(endpoints.ADD_PRODUCT_CSV, file, config);
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

export async function getAllProducts() {
  console.log("ACCESS TOKEN: ", localStorage.getItem("access_token"));
  try {
    const response = await axios.get(endpoints.GET_ALL_PRODUCTS);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}
