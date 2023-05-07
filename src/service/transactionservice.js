import axios from "axios";
import * as endpoints from "../constants/apiendpoints";

export async function addInboundTransaction(data) {
  try {
    const response = await axios.post(endpoints.ADD_INBOUND_TRANSACTION, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error Response: ", error.response.data);
      return error.response.data;
    }
  }
}


export async function addInboundTransactionFromCsv(file) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(endpoints.ADD_INBOUND_TRANSACTION_CSV, file, config);
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

export async function addOutboundTransaction(data) {
  try {
    const response = await axios.post(endpoints.ADD_OUTBOUND_TRANSACTION, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error Response: ", error.response.data);
      return error.response.data;
    }
  }
}


export async function addOutboundTransactionFromCsv(file) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(endpoints.ADD_OUTBOUND_TRANSACTION_CSV, file, config);
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}