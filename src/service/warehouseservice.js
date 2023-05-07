import axios from "axios";
import * as endpoints from "../constants/apiendpoints";

export async function addWarehouse(data) {
  try {
    const response = await axios.post(endpoints.ADD_WAREHOUSE, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.log("Error Response: ", error.response.data);
      return error.response.data;
    }
  }
}

export async function getAllWarehouse() {
  try {
    const response = await axios.get(endpoints.GET_ALL_WAREHOUSE);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

export async function updateEditedWarehouse(data) {
  console.log("DATA: ", data);
  try {
    const response = await axios.put(endpoints.UPDATE_WAREHOUSE, data);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

export async function getWarehouseCodeList() {
    try {
      const response = await axios.get(endpoints.GET_WAREHOUSE_CODES);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  }


