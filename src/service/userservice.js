import * as endpoints from "../constants/apiendpoints";
import AuthenticatedRequest from "../axios/AuthenticatedRequest";
import { checkAndRefreshToken } from "../utils/tokenutils";

function runBefore(originalFunc, beforeFunc) {
  return async function (...args) {
    beforeFunc();
    return await originalFunc(...args);
  };
}

export const addUserAdminRole = runBefore(
  addUserAdminRoleRequest,
  checkAndRefreshToken
);

export const getAllUserAdminRole = runBefore(
  getAllUsersAdminRoleRequest,
  checkAndRefreshToken
);

export const getAllUserManagerRole = runBefore(
  getAllUsersManagerRoleRequest,
  checkAndRefreshToken
);


async function addUserAdminRoleRequest(data) {
  try {
    const response = await AuthenticatedRequest.post(
      endpoints.CREATE_USER,
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

async function getAllUsersAdminRoleRequest() {
  try {
    const response = await AuthenticatedRequest.get(endpoints.ADMIN_GET_USERS);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

async function getAllUsersManagerRoleRequest() {
  try {
    const response = await AuthenticatedRequest.get(endpoints.MANAGER_GET_USERS);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}
