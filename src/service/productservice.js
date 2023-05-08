import * as endpoints from "../constants/apiendpoints";
import AuthenticatedRequest from "../axios/AuthenticatedRequest";
import { checkAndRefreshToken } from "../utils/tokenutils";

function runBefore(originalFunc, beforeFunc) {
  return async function (...args) {
    beforeFunc();
    return await originalFunc(...args);
  };
}

export const insertProduct = runBefore(
  insertProductRequest,
  checkAndRefreshToken
);
export const addProductFromCsv = runBefore(
  addProductFromCsvRequest,
  checkAndRefreshToken
);
export const getAllProducts = runBefore(
  getAllProductsRequest,
  checkAndRefreshToken
);
export const getPaginatedProducts = runBefore(
  getPaginatedProductsRequest,
  checkAndRefreshToken
);
export const updateEditedProduct = runBefore(
  updateEditedProductRequest,
  checkAndRefreshToken
);
export const searchProduct = runBefore(
  searchProductRequest,
  checkAndRefreshToken
);

async function insertProductRequest(data) {
  try {
    const response = await AuthenticatedRequest.post(
      endpoints.ADD_PRODUCT,
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

async function addProductFromCsvRequest(file) {
  try {
    const response = await AuthenticatedRequest.postMultiPart(
      endpoints.ADD_PRODUCT_CSV,
      file
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

async function getAllProductsRequest() {
  console.log("ACCESS TOKEN: ", localStorage.getItem("access_token"));
  try {
    const response = await AuthenticatedRequest.get(
      endpoints.GET_ALL_PRODUCTS,
      {
        params: {
          q: "Mineral",
          pageIndex: 0,
          pageSize: 10,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

async function getPaginatedProductsRequest(parameter) {
  console.log("Pagination: ", parameter);
  let response = null;

  try {
    response = await AuthenticatedRequest.get(endpoints.PAGINATED_ALL_PRODUCT, {
      params: {
        q: parameter.q,
        pageIndex: parameter.pageIndex,
        pageSize: 10,
      },
    });

    console.log("RESPONSE DATA: ", response.data);

    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

async function updateEditedProductRequest(appProduct) {
  console.log("Product To Submit: ", appProduct);
  try {
    const response = await AuthenticatedRequest.put(
      endpoints.UPDATE_PRODUCT + "/" + appProduct.id,
      {
        name: appProduct.name,
        description: appProduct.description,
        quantity: appProduct.quantity,
        price: appProduct.price,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

async function searchProductRequest(key) {
  try {
    const response = await AuthenticatedRequest.get(endpoints.SEARCH_PRODUCT, {
      params: { key },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}
