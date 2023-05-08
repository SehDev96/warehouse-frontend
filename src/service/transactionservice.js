import * as endpoints from "../constants/apiendpoints";
import AuthenticatedRequest from "../axios/AuthenticatedRequest";
import { checkAndRefreshToken } from "../utils/tokenutils";

function runBefore(originalFunc, beforeFunc) {
  return async function (...args) {
    beforeFunc();
    return await originalFunc(...args);
  };
}

export const addInboundTransaction = runBefore(
  addInboundTransactionRequest,
  checkAndRefreshToken
);

export const addInboundTransactionCsv = runBefore(
  addInboundTransactionCsvRequest,
  checkAndRefreshToken
);

export const addOutboundTransaction = runBefore(
  addOutboundTransactionRequest,
  checkAndRefreshToken
);

export const addOutboundTransactionFromCsv = runBefore(
  addOutboundTransactionFromCsvRequest,
  checkAndRefreshToken
);

async function addInboundTransactionRequest(data) {
  try {
    const response = await AuthenticatedRequest.post(
      endpoints.ADD_INBOUND_TRANSACTION,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error Response: ", error.response.data);
      return error.response.data;
    }
  }
}

async function addInboundTransactionCsvRequest(file) {
  try {
    const response = await AuthenticatedRequest.postMultiPart(
      endpoints.ADD_INBOUND_TRANSACTION_CSV,
      file
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

async function addOutboundTransactionRequest(data) {
  try {
    const response = await AuthenticatedRequest.post(
      endpoints.ADD_OUTBOUND_TRANSACTION,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error Response: ", error.response.data);
      return error.response.data;
    }
  }
}

async function addOutboundTransactionFromCsvRequest(file) {
  try {
    const response = await AuthenticatedRequest.postMultiPart(
      endpoints.ADD_OUTBOUND_TRANSACTION_CSV,
      file
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}
