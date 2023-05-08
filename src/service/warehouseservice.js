import axios from "axios";
import * as endpoints from "../constants/apiendpoints";
import AuthenticatedRequest from "../axios/AuthenticatedRequest";
import { checkAndRefreshToken } from "../utils/tokenutils";

function runBefore(originalFunc, beforeFunc) {
  return async function (...args) {
    beforeFunc();
    return await originalFunc(...args);
  };
}

export const addWarehouseWithBefore = runBefore(
  addWarehouse,
  checkAndRefreshToken
);

export const getAllWarehouseWithBefore = runBefore(
  getAllWarehouse,
  checkAndRefreshToken
);

export const updateEditedWarehouseWithBefore = runBefore(
  updateEditedWarehouse,
  checkAndRefreshToken
);

export const getWarehouseCodeListWithBefore = runBefore(
  getWarehouseCodeList,
  checkAndRefreshToken
);

async function addWarehouse(data) {
  try {
    const response = await AuthenticatedRequest.post(
      endpoints.ADD_WAREHOUSE,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.log("Error Response: ", error.response.data);
      return error.response.data;
    }
  }
}

async function getAllWarehouse() {
  try {
    const response = await AuthenticatedRequest.get(
      endpoints.GET_ALL_WAREHOUSE
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

async function updateEditedWarehouse(data) {
  console.log("DATA: ", data);
  try {
    const response = await AuthenticatedRequest.put(
      endpoints.UPDATE_WAREHOUSE,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

async function getWarehouseCodeList() {
  try {
    const response = await AuthenticatedRequest.get(
      endpoints.GET_WAREHOUSE_CODES
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}
