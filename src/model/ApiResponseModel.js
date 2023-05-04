export default class ApiResponseModel {
  constructor(success, response_code, message, timestamp, payload) {
    this.success = success === undefined ? "" : success;
    this.response_code = response_code === undefined ? "" : response_code;
    this.message = message === undefined ? "" : message;
    this.timestamp = timestamp === undefined ? "" : timestamp;
    this.payload = payload === undefined ? "" : payload;
  }
}
