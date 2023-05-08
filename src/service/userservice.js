import axios from "axios";
import * as endpoints from "../constants/apiendpoints";

export async function addUserAdminRole(data) {
    try {
      const response = await axios.post(endpoints.ADMIN_CREATE_USER, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log("Error Response: ", error.response.data);
        return error.response.data;
      }
    }
  }

  export async function getAllUsersAdminRole() {
    try {
      const response = await axios.get(endpoints.ADMIN_GET_USERS);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  }