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
    const response = await axios.get(endpoints.GET_ALL_PRODUCTS, {
      params: {
        q: "Mineral",
        pageIndex: 0,
        pageSize: 10,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

export async function getPaginatedProducts(parameter) {
  console.log("Pagination: ", parameter);
  let response = null;

  try {
    // if(parameter === undefined){
    //   response = await axios.get(endpoints.PAGINATED_ALL_PRODUCT);
    // } else {
    response = await axios.get(endpoints.PAGINATED_ALL_PRODUCT, {
      params: {
        q: parameter.q,
        pageIndex: parameter.pageIndex,
        pageSize: 10,
      },
    });
    // }

    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

export async function updateEditedProduct(appProduct) {
  console.log("Product To Submit: ", appProduct);
  try {
    const response = await axios.put(
      endpoints.UPDATE_PRODUCT + "/" + appProduct.id,
      {
        name: appProduct.name,
        description: appProduct.description,
        quantity: appProduct.quantity,
        price: appProduct.price,
      }
    );
    // const response = await axios.put(
    //   endpoints.UPDATE_PRODUCT,
    //   JSON.parse(appProduct)
    // );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

export async function searchProduct(key) {
  try {
    const response = await axios.get(endpoints.SEARCH_PRODUCT, {
      params: { key },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}
