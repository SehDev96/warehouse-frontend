let API_PREFIX = "http://localhost:8080/app";

export const AUTHENTICATE = API_PREFIX + "/authenticate";
export const RENEW_ACCESS_TOKEN = API_PREFIX + "/auth/refresh-token";

export const ADD_PRODUCT = API_PREFIX + "/product/add";
export const ADD_PRODUCT_CSV = API_PREFIX + "/product/add/upload";
export const GET_ALL_PRODUCTS = API_PREFIX + "/product/allproducts";
export const UPDATE_PRODUCT = API_PREFIX + "/product/updateproduct";
export const SEARCH_PRODUCT = API_PREFIX + "/product/search";
export const PAGINATED_ALL_PRODUCT = API_PREFIX + "/product/all/pagination";

export const ADD_WAREHOUSE = API_PREFIX + "/warehouse/add";
export const GET_ALL_WAREHOUSE = API_PREFIX + "/warehouse/all";
export const UPDATE_WAREHOUSE = API_PREFIX + "/warehouse/update";
export const GET_WAREHOUSE_CODES = API_PREFIX + "/warehouse/codelist";

export const ADD_INBOUND_TRANSACTION = API_PREFIX + "/transaction/inbound/add";
export const ADD_INBOUND_TRANSACTION_CSV =
  API_PREFIX + "/transaction/inbound/add/upload";

export const ADD_OUTBOUND_TRANSACTION =
  API_PREFIX + "/transaction/outbound/add";
export const ADD_OUTBOUND_TRANSACTION_CSV =
  API_PREFIX + "/transaction/outbound/add/upload";

export const GET_TRANSACTION_LIST = API_PREFIX + "/transaction/list";

export const CREATE_USER = API_PREFIX + "/users/add";
export const ADMIN_GET_USERS = API_PREFIX + "/users/admin/list";
export const MANAGER_GET_USERS = API_PREFIX + "/users/manager/list";
